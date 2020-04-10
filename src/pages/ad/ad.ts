import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ViewContainerData } from '@angular/core/src/view';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { v } from '@angular/core/src/render3';

/**
 * Generated class for the AdPage page.
 *cordova plugin add cordova-plugin-purchase --variable BILLING_KEY=2ffcb9950267246691efe8ecf2df99debc1bcf5a
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ad',
  templateUrl: 'ad.html',
})
export class AdPage {

  more_info=false;
  select_option=-1;
  option=[
    {price:990,text:'1개월'},
    {price:1980,text:'6개월'},
    {price:3520,text:'1년'},
    {price:4730,text:'평생'},
  ];

  constructor(private iap:InAppPurchase,
    public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdPage');
  }

  purchase_base(){
    this.iap
    .getProducts(['prod1','prod2'])
    .then((products) => {
      console.log(products);
        //  [{ productId: 'com.yourapp.prod1', 'title': '...', description: '...', price: '...' }, ...]
    })
    .catch((err) => {
      console.log(err);
    });
  }

  clickbutton(i){
    console.log(i);
    if(this.select_option==i) this.select_option=-1;
    else this.select_option=i;
  }
  
  purchase(){
    
    this.purchase_base();


    this.iap
    .buy('prod1')
    .then((data)=> {
      console.log(data);
      // {
      //   transactionId: ...
      //   receipt: ...
      //   signature: ...
      // }
    })
    .catch((err)=> {
      console.log(err);
    });
  }

  add_menu() {
    //this.viewCtrl.dismiss();
    this.more_info=true;
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  
}
