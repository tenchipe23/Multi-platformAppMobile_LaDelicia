import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
  standalone: false
})
export class PedidosPage implements OnInit {

  titulo: string = 'Pedidos';

  pedidos = [
    { id: 1, cliente: 'Juan Pérez', fecha: new Date(), estado: 'Pendiente' },
    { id: 2, cliente: 'Ana López', fecha: new Date(), estado: 'Completado' },
    { id: 3, cliente: 'Carlos Gómez', fecha: new Date(), estado: 'Pendiente' },
  ];



  constructor() { }

  ngOnInit() {
  }

  verDetalles(pedido: any) {
    console.log('Ver detalles de pedido', pedido);
    // Aquí puedes navegar a una página de detalles de pedido.
  }

}
