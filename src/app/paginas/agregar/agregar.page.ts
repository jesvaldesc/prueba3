
import { Component } from '@angular/core';
import FirebaseService from '../../servicio/firebase.service';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ApiService } from '../../servicio/api.service';
import { Chocolates } from '../modelos/chocolates.model';

@Component({
  selector: 'app-agregar',
  templateUrl: 'agregar.page.html',
})
export class AgregarPage {
  nuevoChocolate: Chocolates = new Chocolates('', '', 0, 0); //se instancia el chocolate a agregar

  constructor(private firebaseService: FirebaseService, private toastController: ToastController, private navCtrl: NavController) {}


  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Chocolate añadido correctamente.',
      duration: 2000, // Duración
      position: 'top' // Posición
    });
    toast.present();
  }


  agregarChocolate() {
    this.firebaseService.addChocolate(this.nuevoChocolate)
      .then(() => {
        // Operación exitosa
        console.log('Chocolate agregado con éxito.');
      })
      .catch((error) => {
        console.error('Error al agregar el chocolate:', error);
      });
      this.navCtrl.navigateBack('/home')

}}
