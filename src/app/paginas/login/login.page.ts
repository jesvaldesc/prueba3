import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicio/auth.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private navCtrl: NavController, private toastController: ToastController) {}

  async ngOnInit() {
    // Obtener las credenciales almacenadas si están disponibles
    const storedCredentials = await this.authService.getStoredCredentials();
    this.email = storedCredentials.email;
    this.password = storedCredentials.password;
  }

  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (result) => {
        console.log('Inicio de sesión exitoso!', result);
        this.presentSuccessToast('Sesión iniciada exitosamente');
        this.navCtrl.navigateForward('/home');
      },
      (error) => {
        console.error('Error durante el inicio de sesión:', error);
        this.presentSuccessToast('Email o contraseña incorrectos');
      }
    );
  }
}
