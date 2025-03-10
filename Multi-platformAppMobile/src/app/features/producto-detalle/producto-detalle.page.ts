import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service'; // Importa el servicio del carrito
import { ToastController, AlertController } from '@ionic/angular'; // Para mostrar notificaciones y alertas

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.page.html',
  styleUrls: ['./producto-detalle.page.scss'],
  standalone: false,
})
export class ProductoDetallePage implements OnInit {
  producto: any; // Variable para almacenar los detalles del producto
  quantity: number = 1; // Cantidad seleccionada por el usuario

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService, // Servicio del carrito
    private toastController: ToastController, // Para mostrar notificaciones
    private alertController: AlertController // Para mostrar alertas
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtén el ID de la URL
    if (id) {
      this.loadProductDetails(+id); // Carga los detalles del producto
    }
  }

  // Cargar detalles del producto
  loadProductDetails(id: number) {
    this.productService.getProductById(id).subscribe(
      (data: any) => {
        this.producto = data; // Asigna los detalles del producto
      },
      (error) => {
        console.error('Error al cargar los detalles del producto:', error);
      }
    );
  }

  // Aumentar la cantidad
  increaseQuantity() {
    if (this.quantity < this.producto.stock) {
      this.quantity++;
    }
  }

  // Disminuir la cantidad
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Mostrar alerta de confirmación
  async confirmarAgregarAlCarrito() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Está seguro de que desea agregar "${this.producto.name_product}" al carrito?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Agregar',
          handler: () => {
            this.agregarAlCarrito();
          }
        }
      ]
    });

    await alert.present();
  }

  // Agregar el producto al carrito
  async agregarAlCarrito() {
    if (this.producto) {
      const productoConCantidad = {
        ...this.producto,
        quantity: this.quantity, // Agrega la cantidad seleccionada
      };
      const agregado = await this.cartService.agregarProducto(productoConCantidad); // Agrega el producto al carrito

      if (agregado) {
        // Mostrar notificación
        const toast = await this.toastController.create({
          message: 'Producto agregado al carrito correctamente!',
          duration: 2000,
          color: 'success',
        });
        toast.present();

        // Reiniciar el contador de cantidad
        this.quantity = 1;
      }
    }
  }
}