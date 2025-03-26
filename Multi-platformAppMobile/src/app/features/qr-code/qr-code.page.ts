import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
  standalone: false
})
export class QrCodePage implements OnInit {
  orderId: string = ''; // Cambiamos a solo almacenar el ID

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['order']) {
        const order = JSON.parse(params['order']);
        this.orderId = order.id; // Extraemos solo el ID de la orden
      }
    });
  } 

}
