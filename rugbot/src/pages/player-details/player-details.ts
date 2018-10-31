import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, AlertController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { PlayerAttendencePage } from '../player-attendence/player-attendence';

@IonicPage()
@Component({
  selector: 'page-player-details',
  templateUrl: 'player-details.html',
})
export class PlayerDetailsPage {

  uid = "";
  fname = "";
  lname = "";
  email = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public plt: Platform, private alertCtrl: AlertController,
    public afd: AngularFireDatabase) {
    this.uid = navParams.get('uid');
    this.fname = navParams.get('fname');
    this.lname = navParams.get('lname');
    this.email = navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerDetailsPage');

    let email = "stefbuys21@gmail.com"; // TODO
    // let email = this.afa.auth.currentUser.email + "";
    this.afd.list('/users',
      ref => ref.orderByChild('email').equalTo(email)).valueChanges()
      .subscribe((data: any) => {
        for (let user of data) {
          const name = user.name + " " + user.surname;
          this.fname = user.name;
          this.lname = user.surname;
          this.email = user.email;
          const userType = user.type;
          console.log('Current user: ' + name);
        }
      });
  }

  editUser() {

  }

  deleteUser() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      subTitle: "This action cannot be undone!", //!!",
      buttons: [
        {
          text: 'Continue',
          handler: data => {
            this.afd.list('/users').remove(this.uid); // still need to test
          }
        },
        {
          text: 'Cancel',
          handler: data => {
            // do nothing
          }
        }
      ]
    });
    alert.present();
  }

  sendEmail() {
    this.plt.ready().then(() => {
      window.open('mailto:' + this.email);
    });
  }

  attendance() {
    this.navCtrl.push(PlayerAttendencePage);
  }
}
