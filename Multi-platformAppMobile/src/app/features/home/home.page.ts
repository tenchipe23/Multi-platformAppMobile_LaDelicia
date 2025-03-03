import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from 'src/app/core/services/product.service'; // Importa el servicio de productos

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {

  titulo: string = 'Inicio';
  productos: any[] = []; // Variable para almacenar los productos
  currentSlide: number = 0; // Variable para rastrear el índice del comentario actual
  private slideInterval: any; // Variable para almacenar el intervalo del carrusel

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private productService: ProductService // Inyecta el servicio de productos
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.navController.navigateRoot('/login');
    } else {
      this.loadProducts(); // Carga los productos
      this.startSlideShow(); // Inicia el carrusel automático
    }
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.category-card').forEach((card) => {
      observer.observe(card);
    });
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval); // Limpia el intervalo cuando el componente se destruye
    }
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % 3; // Cambia el comentario cada 3 segundos
    }, 3000);
  }

  setSlide(index: number) {
    this.currentSlide = index;
  }

  logout() {
    this.authService.logout();
    this.navController.navigateRoot('/login');
  }


  blogPosts = [
    {
      id: 1,
      title: '5 Consejos para un Pan Perfecto',
      description: 'Descubre los secretos para hornear un pan delicioso en casa.',
      image: '../../../assets/img/PanPerfecto.jpg'
    },
    {
      id: 2,
      title: 'Receta de Conchas Tradicionales',
      description: 'Aprende a preparar unas conchas esponjosas y con mucho sabor.',
      image: '../../../assets/img/Receta.jpg'
    },
    {
      id: 3,
      title: 'Beneficios del Pan Integral',
      description: 'Conoce por qué el pan integral es una opción más saludable.',
      image: '../../../assets/img/PanIntegral.jpg'
    }
  ];
}
