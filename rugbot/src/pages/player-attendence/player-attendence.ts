import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";

@IonicPage()
@Component({
  selector: 'page-player-attendence',
  templateUrl: 'player-attendence.html',
})
export class PlayerAttendencePage {

  attendance: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afd: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerAttendencePage');

    // TODO reverse list
    this.attendance = this.afd.list('/attendance/',
      ref => ref.orderByChild('date')).valueChanges();
  }
}
