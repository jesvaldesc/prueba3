import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import FirebaseService from '../servicio/firebase.service';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../servicio/auth.service';
import { ToastController } from '@ionic/angular';
import { Chocolates } from '../paginas/modelos/chocolates.model';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ApiService } from '../servicio/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listar',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  weatherData: any;

  chocolates: Chocolates[] = [];
  constructor(private router: Router,
     private db: AngularFireDatabase,
      private FirebaseService: FirebaseService,
      private navCtrl: NavController,
      private AuthService: AuthService,
      private toastController: ToastController,
      private storage: Storage,
      private ionicStorageModule: IonicStorageModule,
      private apiService: ApiService,
      private httpClient: HttpClient
      ) {}

  irAAgregar() {
    this.router.navigate(['/agregar']);
  }
  // Al iniciar, carga la lista de productos y el clima de Bruselas
  ngOnInit(): void {
    this.loadChocolates();
      this.apiService.getWeather('Brussels').subscribe((data) => {
        this.weatherData = data;
      });
  }
  loadChocolates() {
    this.FirebaseService.getChocolates().subscribe(chocolates => {
      this.chocolates = chocolates;
    });
  }
//Boton de eliminar un producto a traves de su id
  deleteProduct(productId: string) {
    console.log('ID del producto a eliminar:', productId);
    this.FirebaseService.deleteProduct(productId)
      .then(() => {
        console.log('Producto eliminado exitosamente');
        this.loadChocolates(); // Recargar la lista después de eliminar
      })
      .catch(error => {
        console.error('Error al eliminar producto:', error);
      });
  }
  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Sesión cerrada.',
      duration: 2000, // Duración
      position: 'top' // Posición
    });
    toast.present();
  }// boton para editar el producto a traves de su id
  navigateToUpdatePage(productId: string) {
    this.router.navigate(['/editar', productId]);
  }
  //boton de cerrar sesion
  signOut(){
    this.AuthService.SignOut();
    this.presentSuccessToast();
  }



}




