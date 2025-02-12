import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: false
})
export class ContactoPage implements OnInit {
  contactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.contactForm.valid) {
      // Simula envío de mensaje
      const toast = await this.toastController.create({
        message: 'Mensaje enviado correctamente',
        duration: 2000,
        color: 'success'
      });
      toast.present();
      this.contactForm.reset();
    } else {
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos correctamente',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}

