import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController  } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { EmailValidator } from '../../validators/email';
// import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from '@angular/fire/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public auth: AuthProvider, public afd: AngularFireDatabase, public afa: AngularFireAuth, public FormBuilder: FormBuilder,
     public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.registerForm = FormBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      type: [],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      passwordConfirm: ['', Validators.required],
    }, {validator: this.matchPassword('password', 'passwordConfirm')});
  }

  registerUser() {
    if (!this.registerForm.value) {
      console.log(this.registerForm.value);
    } else if (this.registerForm.value.password !== this.registerForm.value.passwordConfirm) {
      let alert = this.alertCtrl.create({
        message: "Passwords do not match.",
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      alert.present();
    } else if (!this.containType()) {
      let alert = this.alertCtrl.create({
        message: "No user type selected.",
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      alert.present();
    } else {
      this.auth.registerUser(this.registerForm.value.email, this.registerForm.value.password)
        .then(auth => {
          const uid = this.afa.auth.currentUser.uid;
          this.afd.list('/users').set(uid, {
            status: "",
            uid: uid + "",
            email: this.registerForm.value.email + "",
            statusColour: "",
            name: this.registerForm.value.name + "",
            surname: this.registerForm.value.surname + "",
            type: this.registerForm.value.type + "", 
            comment: "",
            playDate: "",
          });
          this.navCtrl.setRoot(LoginPage);
        }, error => {
          this.loading.dismiss().then(() => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  matchPassword(password: string, passwordConfirm: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let pass = group.controls[password];
      let passCon = group.controls[passwordConfirm];

      if (pass.value !== passCon.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  containType(): boolean {
    if (this.registerForm.value.type === null || this.registerForm.value.type === '') {
      return false;
    } else {
      return true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
}
