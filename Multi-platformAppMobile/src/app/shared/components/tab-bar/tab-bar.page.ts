import { Component, OnInit } from '@angular/core';
import { MenuService, MenuItem } from '../../../core/services/menu.service'; // Ajusta la ruta según tu estructura


@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.page.html',
  styleUrls: ['./tab-bar.page.scss'],
  standalone: false
})
export class TabBarPage implements OnInit {
  bottomMenuItems: MenuItem[] = []; // Especifica que es un arreglo de MenuItem

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    // Asigna los ítems del menú desde el servicio
    this.bottomMenuItems = this.menuService.bottomMenuItems;
  }

  navigate(route: string) {
    // Llama al método de navegación del servicio
    this.menuService.navigateTo(route);
  }
}
