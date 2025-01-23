import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

export interface MenuItem {
    title: string;
    icon: string;
    route: string;
  }

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // Menú inferior (principal)
  bottomMenuItems: MenuItem[] = [
    { title: 'Inicio', icon: 'home-outline', route: '/home' },
    { title: 'Productos', icon: 'grid-outline', route: '/productos' },
    { title: 'Pedidos', icon: 'cart-outline', route: '/pedidos' },
    { title: 'Compras', icon: 'receipt-outline', route: '/compras' }
  ];

  constructor(private navCtrl: NavController) {}

  navigateTo(route: string) {
    this.navCtrl.navigateRoot(route);
  }
}
