import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegisterService } from 'src/app/core/services/register.service';
import { NgForm } from '@angular/forms';

interface UserData {
  username: string;
  name: string;
  first_surname: string;
  last_surname: string;
  phone_number: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit, AfterViewInit {
  @ViewChild('registerForm') registerForm?: NgForm;

  userData: UserData = {
    username: '',
    name: '',
    first_surname: '',
    last_surname: '',
    phone_number: '',
    email: '',
    password: ''
  };

  confirmPassword = '';
  isProcessing = false;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.registerForm) {
        console.error('El formulario no se ha inicializado correctamente');
      }
    });
  }

  isValidEmail(): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.userData.email);
  }

  isValidPhone(): boolean {
    return /^[0-9]{10}$/.test(this.userData.phone_number);
  }

  isValidPassword(): boolean {
    return this.userData.password === this.confirmPassword;
  }

  async register(): Promise<void> {
    if (this.registerForm && this.registerForm.valid && this.isValidPassword() && this.isValidPhone() && this.isValidEmail()) {
      this.isProcessing = true;
      this.registerService.register(this.userData).subscribe({
        next: async (response) => {
          this.isProcessing = false;
          if (response.token) {
            await this.presentToast('Registro exitoso', 'success');
            this.router.navigate(['/home']);
          } else {
            await this.presentToast('Registro exitoso. Inicia sesión', 'success');
            this.router.navigate(['/login']);
          }
        },
        error: async (error) => {
          this.isProcessing = false;
          await this.presentToast(error.message, 'danger');
        }
      });
    }
  }

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}