import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private navController: NavController, private authService: AuthService) {}

  logout() {
    this.authService.logout();
    this.navController.navigateRoot('/login');
  }
}