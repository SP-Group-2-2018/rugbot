import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';

// import { FirebaseProvider } from '../../providers/firebase/firebase';

// import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-coach-list',
  templateUrl: 'coach-list.html',
})
export class CoachListPage {

  date = new Date();
  uid;
  // attend: ;
  users: Observable<any[]>;
  public usersAtPractice: String[] = [];
  // date: DatePickerDirective;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public afd: AngularFireDatabase) {
  }

  mark(user) {
    console.log(user.$key);
    // alert(new Date().toISOString());
    console.log(this.usersAtPractice.push(uid));
  }

  //does not work...
  pushToFire() {
    this.afd.list('/attendance/').push({ key: this.date, uid: this.uid });
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
  }

  ngOnInit() {
    this.users = this.afd.list('/users').valueChanges();
  }
}
