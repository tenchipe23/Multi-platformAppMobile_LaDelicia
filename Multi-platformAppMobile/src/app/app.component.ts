import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from './core/services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  showMenu = true;

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showMenu = !this.router.url.includes('/login') && !this.router.url.includes('/register');
      }
    });

    this.initializeApp();
  }

  initializeApp() {
    const prefersDark = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark', prefersDark);
  }
}