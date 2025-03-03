import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa HttpClient y HttpHeaders
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private carrito: any[] = []; // Almacena los productos en el carrito
  private apiUrl = 'http://localhost:3006/api/orders/create/order'; // URL de la API

  constructor(private toastController: ToastController, private http: HttpClient) {} // Inyecta HttpClient

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

  // Crear una orden
  async crearOrden(clientId: number): Promise<boolean> {
    const orderDetails = this.carrito.map(item => ({
      productsid: item.id,
      quantity: item.quantity,
      price_at_order: item.price_product
    }));

    const order = {
      clientid: clientId,
      payment_methodid: 1, // Método de pago por defecto con ID 1
      total: this.carrito.reduce((total, item) => total + (item.price_product * item.quantity), 0),
      details: orderDetails
    };

    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    try {
      await this.http.post(this.apiUrl, order, { headers }).toPromise();
      return true;
    } catch (error) {
      console.error('Error al crear la orden:', error);
      return false;
    }
  }
}