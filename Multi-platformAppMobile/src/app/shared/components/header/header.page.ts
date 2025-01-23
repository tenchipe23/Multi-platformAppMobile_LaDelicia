import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: false
})
export class HeaderPage implements OnInit {


  @Input() titulo: string = '';  // Recibe el valor de titulo


  constructor() { }

  ngOnInit() {
  }

}
