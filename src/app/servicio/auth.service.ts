// auth.service.ts

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router ) {}

  // Registro de usuario
   signUp(email: string, password: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          return this.firestore.collection('users').doc(user.uid).set({
            email: user.email,
          });
        } else {
          throw new Error('El usuario no está disponible');
        }
      })
      .catch((error) => {
        throw error;
      }));
  }
  login(email: string, password: string): Observable<any> { //Inicio de sesion
    return from(this.afAuth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        throw error;
      }));
  }
  async SignOut() { //Cerrar sesion
    try {
      await this.afAuth.signOut();
      console.log('Sesion cerrada')
      this.router.navigate(['/login'])
    } catch (error){
      console.error('Error al cerrar sesion', error)
    }
  }
  getUserAuthState() {
    return this.getUserAuthState().pipe(
  );}



}
