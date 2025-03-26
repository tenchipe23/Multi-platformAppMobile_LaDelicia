import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';



@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
  standalone: false
})
export class MiPerfilPage implements OnInit {
  user: any = {};
  userId: string | null = null;
  loading = true;
  photo: string | undefined;

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private alertController: AlertController,
    private userService: UserService,
    private actionSheetController: ActionSheetController // Agregar esta línea
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.fetchUserData();
    }
  }

  async changePhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      buttons: [
        {
          text: 'Tomar foto',
          icon: 'camera',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Seleccionar de la galería',
          icon: 'image',
          handler: () => {
            this.selectFromGallery();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
  
  // Función para tomar una foto
  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });
  
      this.photo = image.webPath;
    } catch (error) {
      console.error('Error al tomar la foto: ', error);
    }
  }
  
  // Función para seleccionar una foto desde la galería
  async selectFromGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });
  
      this.photo = image.webPath;
    } catch (error) {
      console.error('Error al seleccionar la foto: ', error);
    }
  }

  async fetchUserData() {
    try {
      if (!this.userId) return;
      const response = await this.userService.getUserData(this.userId).toPromise();
      
      // Check if we received the expected data structure
      if (response && response.userData) {
        this.user = response.userData;
      } else {
        console.error('Invalid response format:', response);
        this.user = {};
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.user = {};
    } finally {
      this.loading = false;
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