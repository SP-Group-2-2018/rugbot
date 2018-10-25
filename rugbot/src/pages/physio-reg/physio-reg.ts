import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-physio-reg',
  templateUrl: 'physio-reg.html',
})
export class PhysioRegPage {

  myform: FormGroup;
  injuries: string[] = [
    'Red',
    'Orange',
    'Green'
  ]

  public isSearchbarOpened = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.myform = new FormGroup({
      userdetails: new FormGroup({
        name: new FormControl(),
        Surname: new FormControl(),
        injury: new FormControl(),
        recovery: new FormControl(),
      }),
      injuries: new FormControl(),
    })
  }

  onSearch(event) {
    console.log(event.target.value);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhysioRegPage');
  }
}
