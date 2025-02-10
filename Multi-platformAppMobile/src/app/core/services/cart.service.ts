import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private carrito: any[] = []; // Almacena los productos en el carrito

  // Agregar un producto al carrito
  agregarProducto(producto: any) {
    const productoExistente = this.carrito.find((item) => item.id === producto.id);
    if (productoExistente) {
      productoExistente.quantity += producto.quantity; // Actualiza la cantidad si el producto ya está en el carrito
    } else {
      this.carrito.push(producto); // Agrega el producto al carrito
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