import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class FirebaseProvider {
  users: any;

  constructor(public http: HttpClient, public afd: AngularFireDatabase) {
    // this.users = afd.list('/users/');
  }

  //for testing purposes
  getUsers() {
    return this.afd.list('/users/');
  }
}
