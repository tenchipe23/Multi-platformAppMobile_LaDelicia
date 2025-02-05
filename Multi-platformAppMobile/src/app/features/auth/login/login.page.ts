import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  userOrEmail: string = '';  // Puede ser usuario o correo electrónico
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  login(): void {
    if (!this.userOrEmail || !this.password) {
      this.presentToast('Por favor, ingrese su usuario/email y contraseña');
      return;
    }
  
    const isEmail = this.isValidEmail(this.userOrEmail);
    let username = '';
    let email = '';
  
    if (isEmail) {
      email = this.userOrEmail;
    } else {
      username = this.userOrEmail;
    }
  
    this.authService.login(username, email, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error al iniciar sesión', err);
        let errorMessage = 'Credenciales incorrectas';
        if (err.error && err.error.error) {
          errorMessage = err.error.error;
        }
        this.presentToast(errorMessage);
      },
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  private isValidEmail(value: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(value);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }

  ngOnInit() {}
}