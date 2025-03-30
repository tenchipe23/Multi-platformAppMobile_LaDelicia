import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';
import { EditarPerfilModalComponent } from './editar-perfil-modal/editar-perfil-modal.component';
import { ProfileService } from '../../core/services/profile.service';

interface UserResponse {
  userData: any;
  authData: any;
}

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
  public authData: any;
  

  constructor(
    private navController: NavController,
    private authService: AuthService,
    private alertController: AlertController,
    private userService: UserService,
    private profileService: ProfileService,
    private actionSheetController: ActionSheetController,
    private modalCtrl: ModalController
  ) { }

  async openEditModal() {
    const modal = await this.modalCtrl.create({
      component: EditarPerfilModalComponent,
      componentProps: {
        userId: this.userId
      },
      cssClass: 'modal-flotante',
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5,
      backdropDismiss: true
    });

    modal.onDidDismiss().then((data) => {
      if (data.data?.updated) {
        this.fetchUserData(); // Refrescar datos del usuario
      }
    });

    await modal.present();
  }

  async changeProfilePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });
  
    if (image.webPath) {
      this.photo = image.webPath;
      this.profileService.setProfilePhoto(this.photo); // Guarda la foto en el servicio
    } else {
      console.error('No se pudo obtener la ruta de la imagen');
    }
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (data: UserResponse) => {
          this.user = data.userData;
          this.authData = data.authData;
          this.loading = false; // Ocultar spinner
        },
        (error) => {
          console.error('Error fetching user data:', error);
          this.loading = false; // Ocultar spinner en caso de error
        }
      );
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
            this.selectFromGallery();//?????
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