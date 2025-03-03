import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { Router } from '@angular/router';
import { OrderStateService } from '../../core/services/order-state.service'; // Importa el servicio OrderStateService

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
  standalone: false
})
export class PedidosPage implements OnInit {
  titulo: string = 'Pedidos';
  orders: any[] = [];

  constructor(private orderService: OrderService, private router: Router, private orderStateService: OrderStateService) { }

  ngOnInit() {
    this.loadOrders();
    this.orderStateService.orders$.subscribe((orders) => {
      this.orders = orders;
    });
  }

  loadOrders() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.orderService.getOrdersByClientId(userId).subscribe(
        (data) => {
          this.orders = data || []; // Asegúrate de que this.orders sea un array
          this.orderStateService.setOrders(this.orders); // Actualiza el estado compartido
          console.log('Orders:', this.orders); // Verifica las órdenes en la consola
        },
        (error) => {
          console.error('Error fetching orders:', error);
          this.orders = []; // Inicializa this.orders como un array vacío en caso de error
        }
      );
    } else {
      console.error('User ID not found in localStorage');
      this.orders = []; // Inicializa this.orders como un array vacío si no se encuentra el ID del usuario
    }
  }

  goToOrderDetail(orderId: string) {
    this.router.navigate(['/detalle-pedido', orderId]);
  }
}