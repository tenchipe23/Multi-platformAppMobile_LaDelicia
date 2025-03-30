import { Component, Input } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: false
})
export class SideBarComponent {
  profilePhoto: string | null = null;

  @Input() showMenu: boolean = false;

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private alertController: AlertController,
    private profileService: ProfileService, // Añade esto

  ) {}


  ngOnInit() {
    this.profileService.profilePhoto$.subscribe((photo) => {
      this.profilePhoto = photo;
    });
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