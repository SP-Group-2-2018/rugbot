import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
// import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) {}

  loginUser(email: string, pass: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  }

  registerUser(email: string, pass: string): Promise<any> {
  	return this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
  }

}
