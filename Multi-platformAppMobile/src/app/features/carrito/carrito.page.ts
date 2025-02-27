import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service'; // Importa el servicio CartService
import { ToastController, AlertController } from '@ionic/angular'; // Para mostrar notificaciones y alertas

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
    private alertController: AlertController // Inyecta el AlertController
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
  async crearOrden() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.mostrarToast('Error: No se encontró el token de usuario.');
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const clientId = payload.userId;

    const ordenCreada = await this.cartService.crearOrden(clientId);
    if (ordenCreada) {
      this.mostrarToast('Orden creada exitosamente');
      this.cartService.limpiarCarrito();
      this.carrito = [];
    } else {
      this.mostrarToast('Error al crear la orden');
    }
  }
}