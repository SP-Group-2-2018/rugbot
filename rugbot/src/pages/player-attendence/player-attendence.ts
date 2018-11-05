import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-player-attendence',
  templateUrl: 'player-attendence.html',
})
export class PlayerAttendencePage {

  uid = "";
  obs;

  firstName = "test first Name";
  surname = "test surname";

  users: any; //Observable<any[]>;
  dates: any = [""]; //Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afd: AngularFireDatabase, private cd: ChangeDetectorRef) {
    this.uid = navParams.get("uid");

    this.obs = this.afd.list('/attendance').valueChanges().subscribe((data: any) => {
      for (let record of data) {
        if (record.uid == this.uid) {
          console.log(record.date);
          // this.dates = record.date;
          this.dates.push(record.date);
          this.cd.detectChanges();
        }
      }
    });
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad PlayerAttendencePage');
  // }

  ionViewDidLoad() {
    this.dates = [""];
    let uid = "";

    this.afd.list('/users',
      ref => ref.orderByChild('uid').equalTo(this.uid)).valueChanges()
      .subscribe((data: any) => {
        for (let user of data) {
          uid = user.uid;
          this.firstName = user.name;
          this.surname = user.surname;
        }
      });
  }

  ionViewWillLeave() {
    this.cd.detach();
    this.obs.unsubscribe();
  }
}
