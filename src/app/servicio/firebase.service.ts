
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { Chocolates } from '../paginas/modelos/chocolates.model';
import { Storage } from '@ionic/storage-angular';
import { IonicStorageModule } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export default class FirebaseService {
  constructor(private db: AngularFireDatabase,
    private storage: Storage,
    private ionicStorageModule: IonicStorageModule) {}


    //elimina un producto por su id
  deleteProduct(productId: string) {
    return this.db.object(`/chocolates/${productId}`).remove();
  }
  //obtiene los productos por su id
  getProductById(productId: string) {
    return this.db.object(`/chocolates/${productId}`).valueChanges();
  }
  //Obtiene la lista de productos
getChocolates(): Observable<Chocolates[]> {
  return this.db.list<{ key: string }>('chocolates').snapshotChanges().pipe(
    map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val() as Chocolates
      }));
    })
  );
}
//Persistencia
public async set(key: string, value: any): Promise<void> {
  try {
    await this.db.object(key).set(value);
    console.log('Operación de escritura exitosa.');
  } catch (error) {
    console.error('Error al escribir en Firebase:', error);
  }
}
//Persistencia
public async get(key: string): Promise<any> {
  try {
    const data = await this.db.object(key).valueChanges().toPromise();
    console.log('Operación de lectura exitosa:', data);
    return data;
  } catch (error) {
    console.error('Error al leer desde Firebase:', error);
    throw error;
  }
}
//Metodo para agregar
addChocolate(chocolate: Chocolates): Promise<void> {
  const key = this.db.createPushId();
  chocolate.key = key;
  return this.db.object(`${'/chocolates'}/${key}`).set(chocolate);
}
//Metodo para actualizar
updateProduct(productId: string, updatedProduct: Chocolates): Promise<void> {
  // Elimina la propiedad 'key' del objeto actualizado para evitar problemas de actualización
  const { key, ...productWithoutKey } = updatedProduct;
  return this.db.object(`/chocolates/${productId}`).update(productWithoutKey);
}

}
