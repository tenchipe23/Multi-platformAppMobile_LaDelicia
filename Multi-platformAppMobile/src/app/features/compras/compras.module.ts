import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprasPageRoutingModule } from './compras-routing.module';

import { ComprasPage } from './compras.page';
import { TabBarPageModule } from '../../shared/components/tab-bar/tab-bar.module'; // Importar el módulo de TabBarPage
import { HeaderPageModule } from '../../shared/components/header/header.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComprasPageRoutingModule,
    HeaderPageModule,
    TabBarPageModule
  ],
  declarations: [ComprasPage]
})
export class ComprasPageModule {}
