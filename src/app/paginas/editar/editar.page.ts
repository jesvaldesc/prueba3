import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import FirebaseService from '../../servicio/firebase.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Chocolates } from '../modelos/chocolates.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  productId: string;
  product: any;
  productoEditado: Chocolates = new Chocolates( '', '', 0, 0); //Se instancia el chocolate a editar reiniciando los campos anteriores.

  constructor(private route: ActivatedRoute,
     private FirebaseService: FirebaseService,
     private navCtrl: NavController,
     private toastController: ToastController) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id'); //cargamos cada producto por su id al iniciar la pagina
    this.loadProduct();

}
loadProduct() {
  this.FirebaseService.getProductById(this.productId).subscribe((product: Chocolates) => {
    this.product = product;
  });
}
async presentSuccessToast() {
  const toast = await this.toastController.create({ //Mensaje de éxito
    message: 'Objeto editado correctamente.',
    duration: 2000, // Duración
    position: 'top' // Posición
  });
  toast.present();
}

updateProduct() {
  this.FirebaseService.updateProduct(this.productId, this.productoEditado).then(() => {
    console.log('Producto actualizado exitosamente:', this.productoEditado);
    this.presentSuccessToast();
    this.navCtrl.navigateBack('/home'); //Se actualizan los datos seleccionados y se vuelve a la pagina principal
  });
}
}
