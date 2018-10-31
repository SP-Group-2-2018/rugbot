import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, AlertController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { PlayerAttendencePage } from '../player-attendence/player-attendence';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';

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
    public afd: AngularFireDatabase, public afa: AngularFireAuth) {
    // this.uid = navParams.get('uid');
    // this.fname = navParams.get('fname');
    // this.lname = navParams.get('lname');
    // this.email = navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerDetailsPage');

    const email = this.afa.auth.currentUser.email + "";

    this.afd.list('/users',
      ref => ref.orderByChild('email').equalTo(email)).valueChanges()
      .subscribe((data: any) => {
        for (let user of data) {
          const name = user.name + " " + user.surname;
          this.fname = user.name;
          this.lname = user.surname;
          this.email = user.email;
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
            this.afd.list('/users/').remove(this.afa.auth.currentUser.uid); // works!!!
            this.afa.auth.currentUser.delete().then(thing => {
              console.log("This is the end........");
              this.navCtrl.setRoot(LoginPage);
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
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
