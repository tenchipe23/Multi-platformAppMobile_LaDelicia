import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { Router } from '@angular/router';
import { OrderStateService } from '../../core/services/order-state.service'; // Importa el servicio OrderStateService
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { inject } from '@angular/core';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
  standalone: false
})
export class PedidosPage implements OnInit {
  titulo: string = 'Pedidos';
  orders: any[] = [];
  userName: string = '';
  http = inject(HttpClient);
  constructor(private orderService: OrderService, private router: Router, private orderStateService: OrderStateService) { }

  ngOnInit() {
    this.loadUserDetails(localStorage.getItem('userId') || '');
    this.loadOrders();
    this.orderStateService.orders$.subscribe((orders) => {
      this.orders = orders;
    });
  }

  loadUserDetails(userId: string) {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No authentication token found');
      this.userName = 'Usuario no encontrado';
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get(`${environment.API_URL}/users/get/users/by/${userId}`, { headers }).subscribe(
      (user: any) => { 
        this.userName = user.name || 'Usuario no encontrado';
      },
      (error) => {
        console.error('Error fetching user details:', error);
        this.userName = 'Usuario no encontrado';
      }
    );
  }

  loadOrders() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.orderService.getOrdersByClientId(userId).subscribe(
        (data) => {
          // Filtrar los pedidos para excluir aquellos con el estado "recogido"
          this.orders = (data || []).filter((order: any) => 
            order.status !== 'recogido'
          );
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  goToOrderDetail(orderId: string) {
    this.router.navigate(['/detalle-pedido', orderId]);
  }
}