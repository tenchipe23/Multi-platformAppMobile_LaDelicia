import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesService } from '../../core/services/sales.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

interface OrderDetail {
  id: string;
  orderid: string;
  quantity: number;
  productsid: string;
  price_at_order: string;
  subtotal: string;
  productName?: string;
  productImage?: string;
}

interface Order {
  id: string;
  total: string;
  status: string;
  clientid: string;
  payment_methodid: string;
  expiration_time: string;
  details: OrderDetail[];
}

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.page.html',
  styleUrls: ['./detalle-compra.page.scss'],
  standalone: false
})
export class DetalleCompraPage implements OnInit {
  order: Order | null = null;
  isLoading = true;
  error: string | null = null;
  isDownloading = false;

  constructor(
    private route: ActivatedRoute,
    private salesService: SalesService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.loadOrderDetails(orderId);
    } else {
      this.error = 'No se encontró el ID de la orden';
      this.isLoading = false;
    }
  }

  loadOrderDetails(orderId: string) {
    this.isLoading = true;
    this.error = null;

    this.salesService.getOrderDetails(orderId).subscribe({
      next: (orderData) => {
        console.log('Datos de la orden recibidos:', orderData);
        this.order = orderData;
        
        if (this.order && this.order.details && this.order.details.length > 0) {
          this.loadProductDetails();
        } else {
          console.error('La orden no tiene detalles');
          this.error = 'No se encontraron detalles de la orden';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error al cargar los detalles de la orden:', error);
        this.error = error.message || 'Error al cargar los detalles de la orden';
        this.isLoading = false;
      }
    });
  }

  loadProductDetails() {
    if (!this.order || !this.order.details) return;

    const productRequests = this.order.details.map(detail =>
      this.salesService.getProductById(detail.productsid).pipe(
        map(product => ({
          ...detail,
          productName: product.name,
          productImage: product.image
        }))
      )
    );

    forkJoin(productRequests).subscribe({
      next: (updatedDetails) => {
        if (this.order) {
          this.order.details = updatedDetails;
        }
        console.log('Detalles actualizados con información de productos:', updatedDetails);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar los detalles de los productos:', error);
        this.error = 'Error al cargar la información de los productos';
        this.isLoading = false;
      }
    });
  }

  async downloadTicket() {
    if (!this.order) return;
    
    this.isDownloading = true;
    
    try {
      const blob = await this.salesService.downloadTicket(this.order.id).toPromise();
      
      if (blob) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ticket-orden-${this.order.id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        const toast = await this.toastController.create({
          message: 'Ticket descargado correctamente',
          duration: 2000,
          color: 'success',
          position: 'bottom'
        });
        toast.present();
      }
    } catch (error) {
      console.error('Error al descargar el ticket:', error);
      const toast = await this.toastController.create({
        message: 'Error al descargar el ticket',
        duration: 2000,
        color: 'danger',
        position: 'bottom'
      });
      toast.present();
    } finally {
      this.isDownloading = false;
    }
  }

  formatDate(date: string): string {
    try {
      return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return 'Fecha no disponible';
    }
  }

  formatCurrency(amount: string | number): string {
    try {
      const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
      return numericAmount.toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN'
      });
    } catch (error) {
      console.error('Error al formatear moneda:', error);
      return 'Monto no disponible';
    }
  }

  getPaymentMethod(methodId: string): string {
    const methods: { [key: string]: string } = {
      '1': 'Efectivo',
      '2': 'Tarjeta',
      '3': 'Transferencia'
    };
    return methods[methodId] || 'Método desconocido';
  }

  goBack() {
    this.router.navigate(['/compras']);
  }
}
