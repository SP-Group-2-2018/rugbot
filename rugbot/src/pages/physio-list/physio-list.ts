import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';

	@IonicPage()
@Component({
  selector: 'page-physio-list',
  templateUrl: 'physio-list.html',
})
export class PhysioListPage {

	users: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
		public afd: AngularFireDatabase) {
  }

  ionViewDidLoad() {
  	this.initUsers();
	}

  initUsers() {
  	this.users = this.afd.list('users').valueChanges();
  }
}
