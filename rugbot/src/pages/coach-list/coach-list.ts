import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';

import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-coach-list',
  templateUrl: 'coach-list.html',
})
export class CoachListPage {

  users: Observable<any[]>;
  // date: DatePickerDirective;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, public afd: AngularFireDatabase) {
  }

  mark() {
    alert('add to db');
    alert(new Date().toISOString());
  }

  view(sdf) {
    let alert = this.alertCtrl.create({
      title: sdf,
      subTitle: '10% of battery remaining',
      buttons: ['Close']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoachListPage');
    this.users = this.afd.list('users').valueChanges();
  }
}
