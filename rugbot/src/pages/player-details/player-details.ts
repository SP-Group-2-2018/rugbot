import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, AlertController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { PlayerAttendencePage } from '../player-attendence/player-attendence';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';

import { EmailValidator } from '../../validators/email';

@IonicPage()
@Component({
  selector: 'page-player-details',
  templateUrl: 'player-details.html',
})
export class PlayerDetailsPage {

  nameEdit: string;
  surnameEdit: string;
  emailEdit: string;

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
    this.uid = this.navParams.get('user');
    console.log(this.uid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerDetailsPage');

    // let email = this.afa.auth.currentUser.email + "";
    // if (this.uid == '' || this.uid == null) {
    //   this.uid = this.afa.auth.currentUser.uid;
    // }

    this.afd.list('/users',
      ref => ref.orderByChild('uid').equalTo(this.uid)).valueChanges()
      .subscribe((data: any) => {
        for (let user of data) {
          let name = user.name + " " + user.surname;
          this.fname = user.name;
          this.lname = user.surname;
          this.email = user.email;
          console.log('Current user: ' + name);
        }
      });
  }

  validateEmail(email): boolean {
    var isValid: boolean;

    let re = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);

    isValid = re.test(email);
    return isValid;
  }

  editUser() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      subTitle: "You are changing your personal details. This cannot be undone.",
      buttons: [
        {
          text: 'Continue',
          handler: data => {
            // console.log(this.nameEdit);
            if (this.nameEdit == null || this.nameEdit == '') {
              this.nameEdit = this.fname;
            }
            if (this.surnameEdit == null || this.surnameEdit == '') {
              this.surnameEdit = this.lname;
            }
            if (this.emailEdit == null || this.emailEdit == '') {
              this.emailEdit = this.email;
            } else if (!this.validateEmail(this.emailEdit)) {
              let alert = this.alertCtrl.create({
                title: "Invalid email",
                subTitle: "Enter an email with valid format.",
                buttons: [
                  {
                    text: "Ok",
                    role: 'cancel'
                  }
                ]
              });
              alert.present();
              this.emailEdit = this.email;
            }

            this.afd.list('/users/').update(this.uid, {
              email: this.emailEdit,
              name: this.nameEdit,
              surname: this.surnameEdit
            });
            this.nameEdit = null;
            this.surnameEdit = null;
            this.emailEdit = null;
          }
        },
        {
          text: "Cancel",
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  deleteUser() {
    if (this.uid == this.afa.auth.currentUser.uid) {
      let alert = this.alertCtrl.create({
        title: 'Are you sure?',
        subTitle: "This action cannot be undone!", //!!",
        buttons: [
          {
            text: 'Continue',
            handler: data => {
              this.afd.list('/users/').remove(this.uid); // works!!!
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
    } else {
      let alert = this.alertCtrl.create({
        title: 'Cannot delete user',
        subTitle: "Only account owner can delete account.",
        buttons: [
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]
      });
      alert.present();
    }
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
