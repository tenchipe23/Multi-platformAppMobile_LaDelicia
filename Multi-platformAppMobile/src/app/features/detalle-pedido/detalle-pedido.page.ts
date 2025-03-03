import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
  standalone: false
})
export class DetallePedidoPage implements OnInit {
  order: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router // Inyecta el Router
  ) {}

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.loadOrderDetail(orderId);
    } else {
      console.error('Order ID is null');
    }
  }

  loadOrderDetail(orderId: string) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.orderService.getOrdersByClientId(userId).subscribe(
        (data) => {
          const orders = data || [];
          this.order = orders.find((order: any) => order.id === orderId);
          if (this.order) {
            this.loadProductDetails();
          }
          console.log('Order:', this.order); // Verifica la orden en la consola
        },
        (error) => {
          console.error('Error fetching order details:', error);
        }
      );
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  loadProductDetails() {
    const productDetailsObservables = this.order.details.map((detail: any) => {
      return this.orderService.getProductById(detail.productsid).pipe(
        map((product) => {
          detail.productName = product.name;
          detail.productImage = product.image;
          return detail;
        })
      );
    });
  
    forkJoin(productDetailsObservables).subscribe(
      (updatedDetails) => {
        this.order.details = updatedDetails;
        console.log('Updated order details:', this.order.details); // Verifica los detalles actualizados en la consola
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  openQrPage() {
    this.router.navigate(['/qr-code'], {
      queryParams: {
        order: JSON.stringify(this.order)
      }
    });
  }
}