import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ContactoPageRoutingModule } from './contacto-routing.module';

import { ContactoPage } from './contacto.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ContactoPage]
})
export class ContactoPageModule {}
