import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoDetallePage } from './producto-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoDetallePageRoutingModule {}