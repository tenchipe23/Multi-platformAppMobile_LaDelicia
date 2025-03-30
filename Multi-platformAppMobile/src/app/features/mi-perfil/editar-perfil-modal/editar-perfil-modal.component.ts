import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-editar-perfil-modal',
  templateUrl: './editar-perfil-modal.component.html',
  styleUrls: ['./editar-perfil-modal.component.scss'],
  standalone: false,
  
})
export class EditarPerfilModalComponent implements OnInit {
  editForm: FormGroup;
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private userService: UserService
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      first_surname: ['', Validators.required],
      last_surname: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }

  ngOnInit() {
    // Obtener datos actuales del usuario y llenar el formulario
    this.userService.getUserData(this.userId).subscribe((user: any) => {
      this.editForm.patchValue({
        name: user.name,
        first_surname: user.first_surname,
        last_surname: user.last_surname,
        phone_number: user.phone_number
      });
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.userService.updateUser(this.userId, this.editForm.value).subscribe({
        next: (response: any) => {
          this.modalCtrl.dismiss({ updated: true });
        },
        error: (err: any) => {
          console.error('Error al actualizar el perfil:', err);
        }
      });
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
