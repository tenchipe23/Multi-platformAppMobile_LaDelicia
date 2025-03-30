import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { QRCodeComponent } from 'angularx-qrcode';
import { EditarPerfilModalComponent } from './features/mi-perfil/editar-perfil-modal/editar-perfil-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    EditarPerfilModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    QRCodeComponent
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}