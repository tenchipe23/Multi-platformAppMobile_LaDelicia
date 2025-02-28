import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
  standalone: false
})
export class MiPerfilPage implements OnInit {
  user: any = {};

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const token = localStorage.getItem('authToken');
    console.log('Token:', token); // Añade esta línea para verificar el token en la consola
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log('Decoded Token:', decodedToken); // Añade esta línea para verificar el token decodificado en la consola
      this.user = {
        username: decodedToken.username,
        email: decodedToken.email,
        role: decodedToken.role
      };
      console.log('User:', this.user); // Añade esta línea para verificar los datos del usuario en la consola
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Está seguro que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.authService.logout();
            this.navController.navigateRoot('/login');
          },
        },
      ],
    });

    await alert.present();
  }
}