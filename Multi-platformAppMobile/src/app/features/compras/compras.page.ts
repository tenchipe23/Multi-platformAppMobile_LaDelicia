import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
  standalone: false
})
export class ComprasPage implements OnInit {

  titulo: string = 'Compras';



  constructor( private navController: NavController) { }

  ngOnInit() {
  }

  irATienda() {
    this.navController.navigateRoot('/productos');
  }

}
