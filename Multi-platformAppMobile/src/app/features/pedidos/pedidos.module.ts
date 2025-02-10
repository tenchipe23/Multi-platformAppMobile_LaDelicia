import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TabBarPageModule } from '../../shared/components/tab-bar/tab-bar.module'; // Importar el módulo de TabBarPage

import { PedidosPageRoutingModule } from './pedidos-routing.module';

import { PedidosPage } from './pedidos.page';
import { HeaderPageModule } from '../../shared/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosPageRoutingModule,
    TabBarPageModule,
    HeaderPageModule
  ],
  declarations: [PedidosPage]
})
export class PedidosPageModule {}
