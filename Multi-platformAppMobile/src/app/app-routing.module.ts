import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./features/ajustes/ajustes.module').then( m => m.AjustesPageModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./features/ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
  {
    path: 'mi-perfil',
    loadChildren: () => import('./features/mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule)
  },
  {
    path: 'terminos-condiciones',
    loadChildren: () => import('./features/terminos-condiciones/terminos-condiciones.module').then( m => m.TerminosCondicionesPageModule)
  },
  {
    path: 'politicas-privacidad',
    loadChildren: () => import('./features/politicas-privacidad/politicas-privacidad.module').then( m => m.PoliticasPrivacidadPageModule)
  },
  {
    path: 'tab-bar',
    loadChildren: () => import('./shared/components/tab-bar/tab-bar.module').then( m => m.TabBarPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./features/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./features/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./features/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'compras',
    loadChildren: () => import('./features/compras/compras.module').then( m => m.ComprasPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./features/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'header',
    loadChildren: () => import('./shared/components/header/header.module').then( m => m.HeaderPageModule)
  },











];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
