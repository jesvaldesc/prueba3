// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../servicio/auth.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private navCtrl: NavController, private toastController: ToastController) {}

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Sesión iniciada exitosamente',
      duration: 2000, // Duración
      position: 'top' // Posición
    });
    toast.present();
  }
  async presentSuccessToast2() {
    const toast = await this.toastController.create({
      message: 'Email o contraseña incorrectos',
      duration: 2000, // Duración
      position: 'top' // Posición
    });
    toast.present();
  }

  login() {
    this.authService.login(this.email, this.password)
      .subscribe(
        (result) => {
          console.log('Inicio de sesión exitoso!', result);
          this.presentSuccessToast();
          this.navCtrl.navigateForward('/home');
          },
        (error) => {
          console.error('Error durante el inicio de sesión:', error);
          this.presentSuccessToast2();
        }
      );
  }
}
