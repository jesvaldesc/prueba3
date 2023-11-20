import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicio/auth.service';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

// @ts-ignore
export interface DocumentSnapshotExists<T> extends firebase.firestore.DocumentSnapshot {
}



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
})
export class RegistrarPage implements OnInit {


  email: string = '';
  password: string = '';


  errorMessage: string = '';

  constructor(private authService: AuthService, private toastController: ToastController, private navCtrl: NavController) { }

  ngOnInit(): void {
  }
  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Cuenta creada exitosamente.',
      duration: 2000, // Duración
      position: 'top' // Posición
    });
    toast.present();
  }

  async register() {
    const result = await this.authService.signUp(this.email, this.password)
    .subscribe(
      (result) => {
        this.errorMessage = 'Registro exitoso: ' + result;
      },
      (error) => {
        this.errorMessage = 'Error durante el registro: ' + error;
      }
    );      this.presentSuccessToast();
    this.navCtrl.navigateBack('/login')
}

}
