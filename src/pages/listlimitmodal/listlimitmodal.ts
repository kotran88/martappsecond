import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import firebase from 'firebase';
import { HomePage } from '../home/home';

/**
 * Generated class for the ListlimitmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-listlimitmodal',
  templateUrl: 'listlimitmodal.html',
})
export class ListlimitmodalPage {
  [x: string]: any;
  firemain = firebase.database().ref();
  id: any = "a2f05b91-956a-b480-3525-991002905558"
  nextdirectory = this.firemain.child(this.id);
  flag: any;
  title: any;
  time: any;
  value: any;
  a: any = 0;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.firemain);
    this.flag = this.navParams.get("flag");
    this.title = this.navParams.get("title");
    this.value = this.navParams.get("obj");
  }

  delete() {
    var temp;
    console.log(this.title);
    console.log(this.value);

    for (var a = 0; a < this.value.length - 1; a++) {
      console.log(a + "번째" + this.value[a].time);
      console.log(a + "번째" + this.value[a + 1].time);
      if (this.value[a].time < this.value[a + 1].time) {
        temp = this.value[a];
        this.value[a] = this.value[a + 1];
        this.value[a + 1] = temp;
        console.log(this.value);
      }
    }

    console.log(this.value);
    this.viewCtrl.dismiss({ "value": temp })

  }
  btn() {
    this.viewCtrl.dismiss();
  }
  dismiss() {
    this.viewCtrl.dismiss({"value":""});
  }

}
