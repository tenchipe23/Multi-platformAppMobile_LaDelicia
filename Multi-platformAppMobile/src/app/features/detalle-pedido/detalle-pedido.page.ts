import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ProductService } from '../../core/services/product.service';
import { interval, Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
  standalone: false
})
export class DetallePedidoPage implements OnInit, OnDestroy {
  order: any;
  userName: string = '';
  username: string = '';
  timeRemaining: string = '';
  progress: number = 1; // Valor inicial de la barra de progreso
  progressColor: string = 'success'; // Color inicial de la barra de progreso
  private timerSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private http: HttpClient,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.loadOrderDetail(orderId);
    } else {
      console.error('Order ID is null');
    }
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  loadOrderDetail(orderId: string) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.orderService.getOrderById(orderId).subscribe((data) => {
        this.order = data;
        this.calculateTimeRemaining(); // Calcular inmediatamente al cargar
        this.startTimer(); // Iniciar temporizador para actualizaciones
        this.loadProductDetails();
        this.loadUserDetails(this.order.clientid);
        this.loadUsername();
      });
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  startTimer() {
    // Usar un intervalo más corto para actualizaciones más frecuentes
    this.timerSubscription = interval(100).subscribe(() => {
      this.calculateTimeRemaining();
    });
  }

  calculateTimeRemaining() {
    if (this.order && this.order.expiration_time) {
      const expirationTime = new Date(this.order.expiration_time);
      const startTime = new Date(this.order.created_at);
      const now = new Date();
      
      const totalDuration = expirationTime.getTime() - startTime.getTime();
      const remainingTime = expirationTime.getTime() - now.getTime();

      if (remainingTime > 0) {
        // Calcular progreso más preciso
        this.progress = Math.max(0, Math.min(1, remainingTime / totalDuration));

        // Lógica de color de la barra de progreso
        if (this.progress > 0.7) {
          this.progressColor = 'success'; // Verde
        } else if (this.progress > 0.3) {
          this.progressColor = 'warning'; // Amarillo
        } else if (this.progress > 0.1) {
          this.progressColor = 'danger'; // Rojo
        }

        // Formatear tiempo restante
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        this.timeRemaining = `${hours}h ${minutes}m ${seconds}s`;

        // Forzar detección de cambios
        this.cdr.markForCheck();
      } else {
        // Orden expirada
        this.timeRemaining = 'Expirado';
        this.progress = 0;
        this.progressColor = 'danger';
        
        // Detener el temporizador
        if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
        }

        // Forzar detección de cambios
        this.cdr.markForCheck();
      }
    }
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

  loadUsername() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get(`${environment.API_URL}/users/get/users/by/${userId}`, { headers }).subscribe(
      (response: any) => {
        this.username = response.authData.username || 'Usuario no encontrado';
      },
      (error) => {
        console.error('Error fetching user details:', error);
        this.username = 'Usuario no encontrado';
      }
    );
  }

  loadProductDetails() {
    const productDetailsObservables = this.order.details.map((detail: any) => {
      return this.productService.getProductById(detail.productsid).pipe(
        map((product: any) => {
          detail.productName = product.name_product; // Asignar el nombre del producto
          detail.productImage = product.image; // Asignar la imagen del producto
          return detail;
        })
      );
    });
  
    forkJoin(productDetailsObservables).subscribe(
      (updatedDetails) => {
        this.order.details = updatedDetails;
        console.log('Updated order details:', this.order.details);
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