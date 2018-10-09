import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CoachListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coach-list',
  templateUrl: 'coach-list.html',
})
export class CoachListPage {

	fullName = [{name:'test'},{name:'asdsd'}];
	

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	
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
	  alert("view");
  }
}
