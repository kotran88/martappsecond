import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ViewContainerData } from '@angular/core/src/view';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { v } from '@angular/core/src/render3';
import { AdMobFreeBannerConfig, AdMobFree } from '@ionic-native/admob-free';

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
  flag1:boolean = false;
  flag2:boolean = false;
  flag3:boolean = false;
  flag4:boolean = false;
  more_info=false;
  select_option=-1;
  option=[
    {price:990,text:'1개월'},
    {price:1980,text:'6개월'},
    {price:3520,text:'1년'},
    {price:4730,text:'평생'},
  ];

  constructor(private iap:InAppPurchase,
    public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController, public admobFree: AdMobFree) {
      setTimeout(() => {
        const bannerConfig: AdMobFreeBannerConfig = {
          // add your config here
          // for the sake of this example we will just use the test config
          isTesting: true,
          autoShow: true
        };
        this.admobFree.banner.config(bannerConfig);
  
        this.admobFree.banner.prepare()
          .then(() => {
            // banner Ad is ready
            console.log("ok")
            this.admobFree.banner.show().then(() => {
              console.log("success");
            }).catch((e) => {
              console.log(e);
            })
            // if we set autoShow to false, then we will need to call the show method here
          })
          .catch(e => console.log(e));
      }, 500)
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
    if(i==0){
      this.flag2=false;
      this.flag3=false;
      this.flag4=false;
      if(this.flag1==false){
        this.flag1 = true;
        console.log(this.flag1)
      }else if(this.flag1==true){
        this.flag1 = false;
        console.log(this.flag1);
      }
      else{this.flag1 = false}
    }
    if(i==1){
      this.flag1=true;
      this.flag3=false;
      this.flag4=false;
      if(this.flag2==false){
        this.flag2 = true;
        console.log(this.flag2)
      }else if(this.flag2==true){
        this.flag2 = false;
        console.log(this.flag2);
      }
      else{this.flag2 = false}
    }
    if(i==2){
      this.flag1=true;
      this.flag2=false;
      this.flag4=false;
      if(this.flag3==false){
        this.flag3 = true;
        console.log(this.flag3)
      }else if(this.flag3==true){
        this.flag3 = false;
        console.log(this.flag3);
      }
      else{this.flag3 = false}
    }
    if(i==3){
      this.flag1=true;
      this.flag2=false;
      this.flag3=false;
      if(this.flag4==false){
        this.flag4 = true;
        console.log(this.flag4)
      }else if(this.flag4==true){
        this.flag4 = false;
        console.log(this.flag4);
      }
      else{this.flag4 = false}
    }
    
  
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

  dis(){
    this.navCtrl.pop();
  }
  
}
