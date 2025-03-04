import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { CartService } from '../../core/services/cart.service'; // Importa el CartService

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
  standalone: false
})
export class PagoPage implements OnInit {
  order: any;
  metodoPago: string = 'efectivo'; // Método de pago por defecto
  tiempoExpiracion: string = '30min'; // Tiempo de expiración por defecto
  todayDate: string = new Date().toLocaleDateString(); // Fecha actual

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private orderService: OrderService, // Inyecta el OrderService
    private alertController: AlertController, // Inyecta el AlertController
    private cartService: CartService // Inyecta el CartService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['order']) {
        this.order = JSON.parse(params['order']);
      }
    });
  }

  confirmarPago() {
    this.order.payment_methodid = this.metodoPago === 'tarjeta' ? 2 : 1; // Actualiza el método de pago
    this.order.status = 'pendiente'; // Establece el estado de la orden como pendiente
    this.order.expiration_time = this.calcularTiempoExpiracion(this.tiempoExpiracion); // Añade el tiempo de expiración a la orden
  
    this.orderService.createOrder(this.order).subscribe(
      (newOrder) => {
        console.log('Respuesta de la creación de la orden:', newOrder); // Verifica la respuesta en la consola
        if (newOrder && newOrder.orderId) {  // Cambié id por orderId
          this.mostrarConfirmacion(newOrder.orderId);  // Pasa el orderId
        } else {
          console.error('La respuesta no contiene un ID de orden');
        }
      },
      (error) => {
        console.error('Error al crear la orden:', error);
      }
    );
  }

  calcularTiempoExpiracion(tiempoExpiracion: string): string {
    const now = new Date();
    if (tiempoExpiracion === '30min') {
      now.setMinutes(now.getMinutes() + 30);
    } else if (tiempoExpiracion === '1hora') {
      now.setHours(now.getHours() + 1);
    }
    return now.toISOString();
  }

  async mostrarConfirmacion(orderId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Está seguro de continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.actualizarEstadoOrden(orderId);
          }
        }
      ]
    });

    await alert.present();
  }

  actualizarEstadoOrden(orderId: string) {
    this.orderService.updateOrderStatus(orderId, 'listo para recoger').subscribe(
      async () => {
        this.cartService.limpiarCarrito(); // Limpia el carrito después de actualizar el estado de la orden
        await this.mostrarMensajeExito(); // Muestra el mensaje de éxito
        this.navCtrl.navigateRoot('/home'); // Navega a la página principal o la que desees
      },
      (error) => {
        console.error('Error al actualizar el estado de la orden:', error);
      }
    );
  }

  async mostrarMensajeExito() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Orden creada exitosamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

  goBack() {
    this.navCtrl.back();
  }
}