import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { PlayerDetailsPage } from '../player-details/player-details';

import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {

  users: Observable<any[]>;

  userType = "";
  uid = "";
  boo = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afd: AngularFireDatabase, public afa: AngularFireAuth) {
    this.uid = this.afa.auth.currentUser.uid + "";
    this.userType = this.navParams.get('type');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserListPage');



    this.players();
  }

  players() {
    this.users = this.afd.list('/users',
      ref => ref.orderByChild('type').equalTo("player")).valueChanges();
    this.buttonStatus(false);
  }

  physios() {
    this.users = this.afd.list('/users',
      ref => ref.orderByChild('type').equalTo("physio")).valueChanges();
    this.boo = true;
  }

  coaches() {
    this.users = this.afd.list('/users',
      ref => ref.orderByChild('type').equalTo("coach")).valueChanges();
    this.boo = true;
  }

  details(user) {
    this.navCtrl.push(PlayerDetailsPage, { user: user.uid });
  }

  buttonStatus(bool: boolean) {
    if (this.userType == "player") {
      this.boo = true;
    } else {
      this.boo = bool;
    }
  }
}
