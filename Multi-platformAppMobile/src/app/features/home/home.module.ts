import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { TabBarPageModule } from '../../shared/components/tab-bar/tab-bar.module'; // Importar el módulo de TabBarPage
import { HeaderPageModule } from '../../shared/components/header/header.module'; // Importar el módulo de TabBarPage

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderPageModule,
    TabBarPageModule // Importar el módulo que contiene TabBarPage
  ],
  declarations: [HomePage], 
})
export class HomePageModule {}
