import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, 
              private navController: NavController,
              private toastController: ToastController) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  login() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      if (formValues.email === 'ejemplo@gmail.com' && formValues.password === 'dsm') {
        this.navController.navigateRoot('/home');
      } else {
        this.presentToast();
      }
    } else {
      this.presentToast();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Las credenciales de acceso son incorrectas',
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }
}
