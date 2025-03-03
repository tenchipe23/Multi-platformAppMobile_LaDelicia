import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RedirectGuard } from './core/guards/redirect.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./features/ajustes/ajustes.module').then(m => m.AjustesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./features/ayuda/ayuda.module').then(m => m.AyudaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mi-perfil',
    loadChildren: () => import('./features/mi-perfil/mi-perfil.module').then(m => m.MiPerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'terminos-condiciones',
    loadChildren: () => import('./features/terminos-condiciones/terminos-condiciones.module').then(m => m.TerminosCondicionesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'politicas-privacidad',
    loadChildren: () => import('./features/politicas-privacidad/politicas-privacidad.module').then(m => m.PoliticasPrivacidadPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tab-bar',
    loadChildren: () => import('./shared/components/tab-bar/tab-bar.module').then(m => m.TabBarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'productos',
    loadChildren: () => import('./features/productos/productos.module').then(m => m.ProductosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./features/pedidos/pedidos.module').then(m => m.PedidosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contacto',
    loadChildren: () => import('./features/contacto/contacto.module').then(m => m.ContactoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'compras',
    loadChildren: () => import('./features/compras/compras.module').then(m => m.ComprasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'carrito',
    loadChildren: () => import('./features/carrito/carrito.module').then(m => m.CarritoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'header',
    loadChildren: () => import('./shared/components/header/header.module').then(m => m.HeaderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'producto-detalle/:id',
    loadChildren: () => import('./features/producto-detalle/producto-detalle.module').then(m => m.ProductoDetallePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./features/auth/login/login.module').then(m => m.LoginPageModule),
    canActivate: [RedirectGuard],
  },
  {
    path: 'register',
    loadChildren: () => import('./features/auth/register/register.module').then(m => m.RegisterPageModule),
    canActivate: [RedirectGuard],
    data: { hideMenu: true }
  },
  {
    path: 'detalle-pedido/:id',
    loadChildren: () => import('./features/detalle-pedido/detalle-pedido.module').then(m => m.DetallePedidoPageModule),
    canActivate: [AuthGuard]
  },  {
    path: 'qr-code',
    loadChildren: () => import('./features/qr-code/qr-code.module').then( m => m.QrCodePageModule)
  },
  {
    path: 'pago',
    loadChildren: () => import('./features/pago/pago.module').then( m => m.PagoPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }