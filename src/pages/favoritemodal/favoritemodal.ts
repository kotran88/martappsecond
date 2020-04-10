import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { populateNodeData } from 'ionic-angular/umd/components/virtual-scroll/virtual-util';

/**
 * Generated class for the FavoritemodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-favoritemodal',
  templateUrl: 'favoritemodal.html',
})
export class FavoritemodalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goBack(){
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritemodalPage');
  }

}
