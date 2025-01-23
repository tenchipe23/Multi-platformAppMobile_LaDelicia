import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false
})
export class RegisterPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, 
              public alertController: AlertController,
              private navController: NavController) { 
    this.formularioRegistro = this.fb.group({
      'NombreUsuario': new FormControl("", Validators.required),
      'ApellidoP': new FormControl("", Validators.required),
      'Telefono': new FormControl("", [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      'Correo': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", Validators.required),
      'ConfirmacionPassword': new FormControl("", Validators.required),
    });
  }

  ngOnInit() {}

  async register() {
    if (this.formularioRegistro.valid) {
      const formValues = this.formularioRegistro.value;
      console.log('NombreUsuario:', formValues.NombreUsuario);
      console.log('ApellidoP:', formValues.ApellidoP);
      console.log('Telefono:', formValues.Telefono);
      console.log('Correo:', formValues.Correo);
      console.log('password:', formValues.password);
      console.log('ConfirmacionPassword:', formValues.ConfirmacionPassword);
      this.navController.navigateBack('/login');
    } else {
      const alert = await this.alertController.create({
        header: 'Formulario incompleto',
        message: 'Debe llenar todos los campos requeridos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      this.navController.navigateRoot(['/registro']);
    }
  }


}
