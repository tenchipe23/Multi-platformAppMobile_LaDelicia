import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';  // Asegúrate de importar RouterModule

import { TabBarPage } from './tab-bar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  declarations: [TabBarPage],
  exports: [TabBarPage] // Exporta el componente
})
export class TabBarPageModule {}
