import { Component } from '@angular/core';
import { NavController,App, NavParams,ViewController,Platform, ModalController } from 'ionic-angular';
import { MartinfoPage } from '../martinfo/martinfo';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdPage } from '../ad/ad';
import { RatePage } from '../rate/rate';
import { AdMobFreeBannerConfig, AdMobFree } from '@ionic-native/admob-free';

/**
 * Generated class for the MartmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-martmap',
  templateUrl: 'martmap.html',
})
export class MartmapPage {
  area:any;
  id:any;
  name:any;
  img:any;
  map:any;
  userid:any;
  martflag:any=0;
  constructor(public app:App,public platform:Platform,public view:ViewController,public navCtrl: NavController, public navParams: NavParams,
    private socialSharing: SocialSharing, public modal: ModalController, public admobFree: AdMobFree) {
    this.id = this.navParams.get("id");
    this.userid = this.navParams.get("userid");
    
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

    this.listPrint();
    
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

  listPrint(){
    if(this.id=="lottemart"){
      this.martflag="1";
      this.img="./assets/imgs/009.png";
      this.name="롯데마트";
      this.map="./assets/imgs/028.png";
    }
    else if(this.id=="emart"){
      this.martflag="2";
      this.img="./assets/imgs/010.png";
      this.name="이마트";
      this.map="./assets/imgs/026.png";
    }
    else if(this.id=="homeplus"){
      this.martflag="3";
      this.img="./assets/imgs/011.png";
      this.name="홈플러스";
      this.map="./assets/imgs/027.png";
    }
    else if(this.id=="costco"){
      this.martflag="4";
      this.img="./assets/imgs/012.png";
      this.name="코스트코";
      this.map="./assets/imgs/029.png";
    }
    else if(this.id=="traders"){
      this.martflag="5";
      this.img="./assets/imgs/013.png";
      this.name="이마트 트레이더스";
      this.map="./assets/imgs/030.png";
    }
    else if(this.id=="lottedep"){
      this.martflag="6";
      this.img="./assets/imgs/020.png";
      this.name="롯데 백화점";
      this.map="./assets/imgs/037.png";
    }
    else if(this.id=="ssgdep"){
      this.martflag="7";
      this.img="./assets/imgs/021.png";
      this.name="신세계 백화점";
      this.map="./assets/imgs/038.png";
    }
    else if(this.id=="hyundep"){
      this.martflag="8";
      this.img="./assets/imgs/022.png";
      this.name="현대 백화점";
      this.map="./assets/imgs/039.png";
    }
    else if(this.id=="lotteout"){
      this.martflag="9";
      this.img="./assets/imgs/023.png";
      this.name="롯데 아울렛";
      this.map="./assets/imgs/040.png";
    }
    else if(this.id=="ssgout"){
      this.martflag="10";
      this.img="./assets/imgs/025.png";
      this.name="신세계 아울렛";
      this.map="./assets/imgs/041.png";
    }
    else if(this.id=="hyunout"){
      this.martflag="11";
      this.img="./assets/imgs/024.png";
      this.name="현대아울렛";
      this.map="./assets/imgs/042.png";
    }
    else if(this.id=="nobrand"){
      this.martflag="12";
      this.img="./assets/imgs/014.png";
      this.name="이마트 노브랜드";
      this.map="./assets/imgs/031.png";
    }
    else if(this.id=="everyday"){
      this.martflag="13";
      this.img="./assets/imgs/015.png";
      this.name="이마트 에브리데이";
      this.map="./assets/imgs/032.png";
    }
    else if(this.id=="topmart"){
      this.martflag="14";
      this.img="./assets/imgs/016.png";
      this.name="탑마트";
      this.map="./assets/imgs/033.png";
    }
    else if(this.id=="gs"){
      this.martflag="15";
      this.img="./assets/imgs/017.png";
      this.name="GS수퍼마켓";
      this.map="./assets/imgs/034.png";
    }
    else if(this.id=="express"){
      this.martflag="16";
      this.img="./assets/imgs/018.png";
      this.name="홈플러스 익스프레스";
      this.map="./assets/imgs/035.png";
    }
    else if(this.id=="vicmarket"){
      this.martflag="17";
      this.img="./assets/imgs/019.png";
      this.name="롯데 빅마켓";
      this.map="./assets/imgs/036.png";
    }
   
  }

  lottemartlist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"lottemart", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
       
      });
    });
  }

  emartlist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"emart", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
       

      });
    });
  }

  homepluslist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"homeplus", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
       

      });
    });
  }

  costcolist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"costco", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
       

      });
    });
  }

  traderslist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"traders", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
       

      });
    });
  }

  lottedeplist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"lottedep", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
       

      });
    });
  }

  ssgdeplist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"ssgdep", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
       

      });
    });
  }

  hyundeplist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"hyundep", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
       

      });
    });
  }

  lotteoutlist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"lotteout", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
       

      });
    });
  }

  ssgoutlist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"ssgout", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
       

      });
    });
  }

  hyunoutlist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"hyunout", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
       

      });
    });
  }

  nobrandlist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"nobrand", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
      });
    });
  }

  everydaylist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"everyday", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
      });
    });
  }

  topmartlist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"topmart", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
      });
    });
  }

  gslist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"gs", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
      });
    });
  }

  expresslist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"express", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
      });
    });
  }

  vicmartketlist(area){
    console.log(area);
    this.navCtrl.push(MartinfoPage,{"mart":"vicmarket", "area":area,"id":this.userid}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
      });
    });
  }
}
