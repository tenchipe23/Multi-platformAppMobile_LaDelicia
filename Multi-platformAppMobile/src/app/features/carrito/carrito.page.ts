// filepath: /c:/Users/herre/OneDrive/Escritorio/UTCV/5 Cuatrimestre/PROYECTO INTEGRADOR/AppGit/Multi-platformAppMobile_LaDelicia/Multi-platformAppMobile/src/app/features/carrito/carrito.page.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service'; // Importa el servicio CartService
import { ToastController, AlertController } from '@ionic/angular'; // Para mostrar notificaciones y alertas
import { OrderService } from '../../core/services/order.service'; // Importa el servicio OrderService
import { OrderStateService } from '../../core/services/order-state.service'; // Importa el servicio OrderStateService
import { NavController } from '@ionic/angular'; // Importa NavController

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: false
})
export class CarritoPage implements OnInit {

  carrito: any[] = []; // Lista de productos en el carrito

  constructor(
    private cartService: CartService, 
    private toastController: ToastController,
    private alertController: AlertController, // Inyecta el AlertController
    private orderService: OrderService, // Inyecta el OrderService
    private orderStateService: OrderStateService, // Inyecta el OrderStateService
    private navCtrl: NavController // Inyecta NavController
  ) {}

  ngOnInit() {
    this.carrito = this.cartService.obtenerCarrito(); // Obtén los productos del carrito
  }

  // Método para calcular el total del carrito
  get total(): number {
    return this.carrito.reduce((total, item) => total + (item.price_product * item.quantity), 0);
  }

  async confirmarEliminacion(item: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Está seguro de que desea eliminar "${item.name_product}" del carrito?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarDelCarrito(item);
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarDelCarrito(item: any) {
    this.carrito = this.carrito.filter(producto => producto !== item);
    this.cartService.actualizarCarrito(this.carrito);
    this.mostrarToast(`"${item.name_product}" eliminado del carrito correctamente`);
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });

    await toast.present();
  }

  // Aumentar la cantidad de un producto en el carrito
  increaseQuantity(item: any) {
    if (item.quantity < item.stock) {
      item.quantity++;
      this.cartService.actualizarCarrito(this.carrito);
    }
  }

  // Disminuir la cantidad de un producto en el carrito
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.actualizarCarrito(this.carrito);
    }
  }

  // Crear una orden
 // Crear una orden
 async crearOrden() {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    this.mostrarToast('Error: No se encontró el ID del usuario.');
    return;
  }

  const orderDetails = this.carrito.map(item => ({
    productsid: item.id,
    quantity: item.quantity,
    price_at_order: item.price_product
  }));

  const order = {
    clientid: parseInt(userId),
    payment_methodid: 1, // Método de pago por defecto con ID 1
    total: this.total,
    details: orderDetails
  };

  // Navega a la página de pago con los datos del carrito
  this.navCtrl.navigateForward('/pago', {
    queryParams: {
      order: JSON.stringify(order)
    }
  });
}
}