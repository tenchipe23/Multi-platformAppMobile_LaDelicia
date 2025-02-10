import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {


  titulo: string = 'Inicio';

  constructor(private navController: NavController, private authService: AuthService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.navController.navigateRoot('/login');
    }
  }

  logout() {
    this.authService.logout();
    this.navController.navigateRoot('/login');
  }

}
