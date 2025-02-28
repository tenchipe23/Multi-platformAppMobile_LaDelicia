import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
  standalone: false
})
export class PedidosPage implements OnInit {
  titulo: string = 'Pedidos';
  orders: any[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.orderService.getOrdersByClientId(userId).subscribe(
        (data) => {
          this.orders = data.orders;
          console.log('Orders:', this.orders); // Verifica las órdenes en la consola
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
    } else {
      console.error('User ID not found in localStorage');
    }
  }
}