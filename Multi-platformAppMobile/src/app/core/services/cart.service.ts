import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private carrito: any[] = []; // Almacena los productos en el carrito

  constructor(private toastController: ToastController) {}

  // Agregar un producto al carrito
  async agregarProducto(producto: any): Promise<boolean> {
    const productoExistente = this.carrito.find((item) => item.id === producto.id);
    if (productoExistente) {
      const nuevaCantidad = productoExistente.quantity + producto.quantity;
      if (nuevaCantidad > producto.stock) {
        // Mostrar notificación de que no se puede agregar más productos
        const toast = await this.toastController.create({
          message: 'No se pueden agregar más productos de los disponibles en stock, por favor, disminuya la cantidad.',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
        return false;
      } else {
        productoExistente.quantity = nuevaCantidad;
        return true;
      }
    } else {
      if (producto.quantity > producto.stock) {
        // Mostrar notificación de que no se puede agregar más productos
        const toast = await this.toastController.create({
          message: 'No se pueden agregar más productos de los disponibles en stock, por favor, disminuya la cantidad.',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
        return false;
      } else {
        this.carrito.push({ ...producto, quantity: producto.quantity });
        return true;
      }
    }
  }

  // Obtener los productos del carrito
  obtenerCarrito() {
    return this.carrito;
  }

  // Limpiar el carrito
  limpiarCarrito() {
    this.carrito = [];
  }

  actualizarCarrito(nuevoCarrito: any[]) {
    this.carrito = nuevoCarrito;
  }
}