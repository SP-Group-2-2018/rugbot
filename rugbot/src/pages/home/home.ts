import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PhysioListPage } from '../physio-list/physio-list';
import { AngularFireAuth } from '@angular/fire/auth';

import { LoginPage } from '../login/login';
import { CoachListPage } from '../coach-list/coach-list';
import { PlayerAttendencePage } from '../player-attendence/player-attendence';

// import { AngularFireDatabase } from '@angular/fire/database';
// import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  // users: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afa: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  showPhysio() {
    console.log('hello, this button works');
    this.navCtrl.push(PhysioListPage);
  }

  showCoach() {
    console.log('hello, this button works');
    this.navCtrl.push(CoachListPage);
  }

  logout() {
    this.afa.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  test() {
    this.navCtrl.setRoot(PlayerAttendencePage);
  }
}
