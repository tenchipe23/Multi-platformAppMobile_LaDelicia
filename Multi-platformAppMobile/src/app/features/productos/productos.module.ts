import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TabBarPageModule } from '../../shared/components/tab-bar/tab-bar.module'; // Importar el módulo de TabBarPage

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';
import { HeaderPageModule } from '../../shared/components/header/header.module'; // Importar el módulo de TabBarPage


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosPageRoutingModule,
    TabBarPageModule,
    HeaderPageModule
  ],
  declarations: [ProductosPage]
})
export class ProductosPageModule {}
