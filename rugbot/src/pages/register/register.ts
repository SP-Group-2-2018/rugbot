import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController  } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     public auth: AuthProvider, public FormBuilder: FormBuilder,
     public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.registerForm = FormBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      passwordConfirm: ['', Validators.required],
    }, {validator: this.matchPassword('password', 'passwordConfirm')});
  }

  registerUser() {
    if (!this.registerForm.value) {
      console.log(this.registerForm.value);
    } else {
      this.auth.registerUser(this.registerForm.value.email, this.registerForm.value.password)
        .then(auth => {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
}
