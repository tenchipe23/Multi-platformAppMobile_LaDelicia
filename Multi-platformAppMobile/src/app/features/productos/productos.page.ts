import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: false
})
export class ProductosPage implements OnInit {

  titulo: string = 'Productos';
  productos: any[] = [];
  filteredProductos: any[] = []; // Lista filtrada

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  // Cargar productos
  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        this.productos = data;
        this.filteredProductos = data; // Inicializa filteredProductos con los productos cargados
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  // Cargar más productos (infinite scroll)
  loadMoreProducts(event: any) {
    // Lógica para cargar más productos
    const nuevosProductos = this.getMoreProducts(); // Define nuevosProductos
    setTimeout(() => {
      // Simula la carga de más productos
      this.productos = [...this.productos, ...nuevosProductos];
      this.filteredProductos = [...this.filteredProductos, ...nuevosProductos]; // Actualiza filteredProductos
      event.target.complete();

      // Si no hay más productos, deshabilita el infinite scroll
      if (this.productos.length >= 100) {
        event.target.disabled = true;
      }
    }, 1000);
  }

  // Obtener más productos (simulación)
  getMoreProducts(): any[] {
    // Aquí deberías implementar la lógica para obtener más productos
    // Por ahora, devolveremos un array vacío como ejemplo
    return [
      // Nuevos productos simulados
    ];
  }

  // Filtrar productos
  filterProducts(event: any) {
    console.log('Evento de búsqueda:', event); // Verifica que el evento se esté ejecutando
    const searchTerm = event.target.value.toLowerCase();
    console.log('Término de búsqueda:', searchTerm); // Verifica el término de búsqueda
    this.filteredProductos = this.productos.filter((producto) =>
      producto.name_product.toLowerCase().includes(searchTerm)
    );
    console.log('Productos filtrados:', this.filteredProductos); // Verifica la lista filtrada
  }
}