import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../core/services/sales.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

interface SaleItem {
  productid: string;
  quantity: number;
  price_at_sale: string;
  subtotal: string;
}

interface Sale {
  id: string;
  orderid: string;
  total: string;
  discount: string;
  final_total: string;
  sale_date: string;
  quantity: number;
  price_at_sale: string;
  subtotal: string;
  status?: string;
}

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
  standalone: false,
})
export class ComprasPage implements OnInit {
  titulo = 'Mis Compras';
  sales: Sale[] = [];
  groupedSales: { [key: string]: Sale[] } = {};
  isLoading = false;
  error: string | null = null;

  constructor(
    private salesService: SalesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSales();
  }

  async loadSales() {
    this.isLoading = true;
    this.error = null;
    
    try {
      const userId = await this.authService.getCurrentUserId();
      if (!userId) {
        this.router.navigate(['/login']);
        throw new Error('Usuario no autenticado');
      }

      console.log('Obteniendo compras para el usuario:', userId);

      this.salesService.getSalesByClientId(userId).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          
          if (Array.isArray(response)) {
            // Agrupar las ventas por orderid
            this.groupedSales = response.reduce((acc, sale) => {
              const orderid = sale.orderid;
              if (!acc[orderid]) {
                acc[orderid] = [];
              }
              acc[orderid].push(sale);
              return acc;
            }, {} as { [key: string]: Sale[] });

            // Convertir el objeto agrupado en un array de ventas
            this.sales = Object.entries(this.groupedSales).map(([orderid, items]) => {
              const firstItem = items[0];
              return {
                id: firstItem.id,
                orderid: orderid,
                total: firstItem.total,
                discount: firstItem.discount,
                final_total: firstItem.final_total,
                sale_date: firstItem.sale_date,
                status: 'Completado', // O cualquier otro estado que quieras mostrar
                items: items
              } as any;
            });

            console.log('Compras procesadas:', this.sales);
          } else {
            console.error('Respuesta inválida:', response);
            this.error = 'No se pudieron cargar las compras. Por favor, intenta más tarde.';
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error completo:', error);
          
          if (error.message.includes('token') || error.message.includes('sesión')) {
            console.log('Error de autenticación, redirigiendo a login...');
            this.router.navigate(['/login']);
            this.error = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
          } else {
            this.error = error.message || 'Error al cargar las compras. Por favor, intenta más tarde.';
          }
          
          this.isLoading = false;
        }
      });
    } catch (error: any) {
      console.error('Error en loadSales:', error);
      this.error = error.message || 'Error al obtener el usuario';
      this.isLoading = false;
    }
  }

  getTotalItems(sale: Sale): number {
    return this.groupedSales[sale.orderid]?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  }

  formatDate(date: string): string {
    try {
      return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return 'Fecha no disponible';
    }
  }

  formatCurrency(amount: number | string): string {
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

  getDiscount(sale: Sale): string {
    const discount = parseFloat(sale.discount);
    return discount > 0 ? `- ${this.formatCurrency(discount)}` : '';
  }

  goToSaleDetail(orderId: string) {
    this.router.navigate(['/detalle-compra', orderId]);
  }

  reloadSales() {
    this.loadSales();
  }
}