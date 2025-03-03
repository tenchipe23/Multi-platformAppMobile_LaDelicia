import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RegisterService } from 'src/app/core/services/register.service';
import { NgForm } from '@angular/forms';

// Interfaz para el servicio
interface RegisterRequest {
  username: string;
  name: string;
  first_surname: string;
  last_surname: string;
  phone_number: string;
  email: string;
  password: string;
}

// Interfaz para el componente
interface UserData {
  username: string;
  name: string;
  first_surname: string;
  last_surname?: string;
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
  formErrors = {
    username: '',
    name: '',
    first_surname: '',
    phone_number: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  // Métodos para alternar la visibilidad de las contraseñas
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.registerForm) {
        console.error('El formulario no se ha inicializado correctamente');
      }
    });
  }

  isValidEmail(): boolean {
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.userData.email);
    this.formErrors.email = isValid ? '' : 'Por favor ingrese un correo electrónico válido';
    return isValid;
  }

  isValidPhone(): boolean {
    const isValid = /^[0-9]{10}$/.test(this.userData.phone_number);
    this.formErrors.phone_number = isValid ? '' : 'El número telefónico debe contener 10 dígitos';
    return isValid;
  }

  isValidPassword(): boolean {
    const passwordValid = this.userData.password.length >= 8;
    const passwordsMatch = this.userData.password === this.confirmPassword;

    if (!passwordValid) {
      this.formErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      return false;
    }

    if (!passwordsMatch) {
      this.formErrors.confirmPassword = 'Las contraseñas no coinciden';
      return false;
    }

    this.formErrors.password = '';
    this.formErrors.confirmPassword = '';
    return true;
  }

  validateUsername(): boolean {
    const isValid = this.userData.username.length >= 4;
    this.formErrors.username = isValid ? '' : 'El nombre de usuario debe tener al menos 4 caracteres';
    return isValid;
  }

  validateName(): boolean {
    const isValid = this.userData.name.trim().length > 0;
    this.formErrors.name = isValid ? '' : 'El nombre es requerido';
    return isValid;
  }

  validateFirstSurname(): boolean {
    const isValid = this.userData.first_surname.trim().length > 0;
    this.formErrors.first_surname = isValid ? '' : 'El apellido paterno es requerido';
    return isValid;
  }

  validateForm(): boolean {
    return (
      this.validateUsername() &&
      this.validateName() &&
      this.validateFirstSurname() &&
      this.isValidPhone() &&
      this.isValidEmail() &&
      this.isValidPassword()
    );
  }

  async register(): Promise<void> {
    if (this.registerForm && this.registerForm.valid && this.validateForm()) {
      this.isProcessing = true;

      const registerData: RegisterRequest = {
        ...this.userData,
        last_surname: this.userData.last_surname || ''
      };

      this.registerService.register(registerData).subscribe({
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