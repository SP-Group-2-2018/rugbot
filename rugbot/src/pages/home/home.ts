import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PhysioListPage } from '../physio-list/physio-list';
import { AngularFireAuth } from '@angular/fire/auth';

import { LoginPage } from '../login/login';


// import { AngularFireDatabase } from '@angular/fire/database';
// import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  // users: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afa: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  showPage() {
  	console.log('hello, this button works');
  	this.navCtrl.push(PhysioListPage);
  }

  logout() {
    this.afa.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

}
