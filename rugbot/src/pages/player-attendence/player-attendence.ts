import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { PlayerDetailsPage } from '../player-details/player-details';

@IonicPage()
@Component({
  selector: 'page-player-attendence',
  templateUrl: 'player-attendence.html',
})
export class PlayerAttendencePage {

  email = "";

  firstName = "test first Name";
  surname = "test surname";

  users: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afd: AngularFireDatabase) {
    this.email = navParams.get("email");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerAttendencePage');
  }

  ngOnInit() {
    let uid = "";

    this.afd.list('/users',
      ref => ref.orderByChild('email').equalTo(this.email)).valueChanges()
      .subscribe((data: any) => {
        for (let user of data) {
          uid = user.uid;
          this.firstName = user.name;
          this.surname = user.surname;
        }
      });

    this.users = this.afd.list('/attendance',
      ref => ref.orderByChild('uid').equalTo(uid)).valueChanges();
  }
}
