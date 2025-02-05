import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service'; // Importa el servicio CartService
import { ToastController } from '@ionic/angular'; // Para mostrar notificaciones

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: false
})
export class CarritoPage implements OnInit {

  
  carrito: any[] = []; // Lista de productos en el carrito

  constructor(private cartService: CartService, private toastController: ToastController) {}

  ngOnInit() {
    this.carrito = this.cartService.obtenerCarrito(); // Obtén los productos del carrito
  }

   // Método para calcular el total del carrito
   get total(): number {
    return this.carrito.reduce((total, item) => total + (item.price_product * item.quantity), 0);
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
}
