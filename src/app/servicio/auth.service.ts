import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private storage: Storage
  ) {
    // Inicializar Ionic Storage
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  // Registro de usuario
  signUp(email: string, password: string): Observable<any> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          if (user) {
            return this.firestore.collection('users').doc(user.uid).set({
              email: user.email,
            });
          } else {
            throw new Error('El usuario no está disponible');
          }
        }
      )
    );
  }

  login(email: string, password: string): Observable<any> {
    // Iniciar sesión y guardar credenciales en Ionic Storage
    return from(
      this.afAuth.signInWithEmailAndPassword(email, password).then(
        async (userCredential) => {
          const user = userCredential.user;
          if (user) {
            // Guardar credenciales en Ionic Storage
            await this.storage.set('email', email);
            await this.storage.set('password', password);
          }
        }
      )
    );
  }

  async SignOut() {
    try {
      // Cerrar sesión y limpiar credenciales en Ionic Storage
      await this.afAuth.signOut();
      await this.storage.remove('email');
      await this.storage.remove('password');

      console.log('Sesion cerrada');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesion', error);
    }
  }

  async getStoredCredentials(): Promise<{ email: string; password: string }> {
    const email = await this.storage.get('email') || '';
    const password = await this.storage.get('password') || '';
    return { email, password };
  }

  getUserAuthState() {
    return this.afAuth.authState;
  }
}
