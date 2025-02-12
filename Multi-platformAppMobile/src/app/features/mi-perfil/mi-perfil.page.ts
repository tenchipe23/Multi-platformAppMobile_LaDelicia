import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
  standalone: false
})
export class MiPerfilPage implements OnInit {

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
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
