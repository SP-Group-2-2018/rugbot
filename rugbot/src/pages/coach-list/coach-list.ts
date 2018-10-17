import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-coach-list',
  templateUrl: 'coach-list.html',
})
export class CoachListPage {

	fullName = [{name:'test'},{name:'asdsd'}];


  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoachListPage');
  }

  mark()
  {
	  alert("mark");
  }

  view()
  {
    let alert = this.alertCtrl.create({
    title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Close']
    });
    alert.present();
  }
}
