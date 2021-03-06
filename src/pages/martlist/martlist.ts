import { Component } from '@angular/core';
import { NavController,ViewController,App,Platform, NavParams, ModalController } from 'ionic-angular';
import { MartmapPage } from '../martmap/martmap';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdPage } from '../ad/ad';
import { RatePage } from '../rate/rate';
import { AdMobFreeBannerConfig, AdMobFree } from '@ionic-native/admob-free';

/**
 * Generated class for the MartlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-martlist',
  templateUrl: 'martlist.html',
})

export class MartlistPage {
  martname:any;
  id:any;
  martmap(id){
    console.log(id);
    console.log("user id : "+this.id);
    this.navCtrl.push(MartmapPage,{"id":id,"userid":this.id})
  }

  constructor(public view:ViewController,public app:App,public platform:Platform,public navCtrl: NavController, public navParams: NavParams,
    private socialSharing: SocialSharing, public modal: ModalController, public admobFree: AdMobFree) {
      this.id=this.navParams.get("id");

      
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
  goback(){
    this.navCtrl.pop();
  }

  regularShare() {
    var msg = "백화점 마트 헛걸음 방지 앱\n '백마헛방'\n 쇼핑가기전엔 언제나\n '백마헛방'";
    console.log(msg)
    this.socialSharing.share(msg, null, null, null);
  }
  NoneAd() {
    let modal = this.modal.create(AdPage);
    modal.present();
  }
  appstore() {
    let modal = this.modal.create(RatePage);
    modal.present();
  }

}
