import { Component } from '@angular/core';
import { NavController,App, NavParams,ViewController,Platform, ModalController } from 'ionic-angular';
import { MartinfoPage } from '../martinfo/martinfo';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdPage } from '../ad/ad';
import { RatePage } from '../rate/rate';

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
    private socialSharing: SocialSharing, public modal: ModalController) {
    this.id = this.navParams.get("id");
    this.userid = this.navParams.get("userid");
    // this.platform.registerBackButtonAction(() => {
    //   let nav = app.getActiveNav();
    //   let activeView = nav.getActive();
    
    
    //   if(activeView != null){
    //     if(nav.canGoBack()) {
    //       window.alert(nav.getActive().name)
    //       nav.pop();
    //     }else if (typeof activeView.instance.backButtonAction === 'function')
    //       activeView.instance.backButtonAction();
    //     else nav.parent.select(0); // goes to the first tab
    //   }
    // });

    this.listPrint();
    
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
      this.img="./assets/imgs/009-버튼-PPT 4페이지의 가운데 이미지의 마트별 로고-롯데마트 CI.png";
      this.name="롯데마트";
      this.map="./assets/imgs/028-버튼-PPT 5페이지의 가운데 이미지의 전국지도 버튼-마트-롯데마트.png";
    }
    else if(this.id=="emart"){
      this.martflag="2";
      this.img="./assets/imgs/010-버튼-PPT 4페이지의 가운데 이미지의 마트별 로고-이마트 CI.png";
      this.name="이마트";
      this.map="./assets/imgs/026-버튼-PPT 5페이지의 가운데 이미지의 전국지도 버튼-마트-이마트.png";
    }
    else if(this.id=="homeplus"){
      this.martflag="3";
      this.img="./assets/imgs/011-버튼-PPT 4페이지의 가운데 이미지의 마트별 로고-홈플러스 CI.png";
      this.name="홈플러스";
      this.map="./assets/imgs/027-버튼-PPT 5페이지의 가운데 이미지의 전국지도 버튼-마트-홈플러스.png";
    }
    else if(this.id=="costco"){
      this.martflag="4";
      this.img="./assets/imgs/012-버튼-PPT 4페이지의 가운데 이미지의 마트별 로고-코스트코 CI.png";
      this.name="코스트코";
      this.map="./assets/imgs/029-버튼-PPT 5페이지의 가운데 이미지의 전국지도 버튼-마트-코스트코.png";
    }
    else if(this.id=="traders"){
      this.martflag="5";
      this.img="./assets/imgs/013-버튼-PPT 4페이지의 가운데 이미지의 마트별 로고-이마트 트레이더스 CI.png";
      this.name="이마트 트레이더스";
      this.map="./assets/imgs/030-버튼-PPT 5페이지의 가운데 이미지의 전국지도 버튼-마트-이마트 트레이더스.png";
    }
    else if(this.id=="lottedep"){
      this.martflag="6";
      this.img="./assets/imgs/020-버튼-PPT 4페이지의 가운데 이미지의 백화점별 로고-롯데백화점 CI.png";
      this.name="롯데 백화점";
      this.map="./assets/imgs/037-버튼-PPT 5페이지의 가운데 이미지의 전국지도 버튼-백화점-롯데백화점.png";
    }
    else if(this.id=="ssgdep"){
      this.martflag="7";
      this.img="./assets/imgs/021-버튼-PPT 4페이지의 가운데 이미지의 백화점별 로고-신세백화점 CI.png";
      this.name="신세계 백화점";
      this.map="./assets/imgs/038-버튼-PPT 5페이지의 가운데 이미지의 전국지도 버튼-백화점-신세계백화점.png";
    }
    else if(this.id=="hyundep"){
      this.martflag="8";
      this.img="./assets/imgs/022-버튼-PPT 4페이지의 가운데 이미지의 백화점별 로고-현대백화점 CI.png";
      this.name="현대 백화점";
      this.map="./assets/imgs/039-버튼-PPT 5페이지의 가운데 이미지의 전국지도 버튼-백화점-현대백화점.png";
    }
    else if(this.id=="lotteout"){
      this.martflag="9";
      this.img="./assets/imgs/023-버튼-PPT 4페이지의 가운데 이미지의 아울렛별 로고-롯데아울렛 CI.png";
      this.name="롯데 아울렛";
      this.map="./assets/imgs/040-버튼-PPT 5페이지의 가운데 이미지의 전국지도 버튼-아울렛-롯데아울렛.png";
    }
    else if(this.id=="ssgout"){
      this.martflag="10";
      this.img="./assets/imgs/025-버튼-PPT 4페이지의 가운데 이미지의 아울렛별 로고-신세계아울렛 CI.png";
      this.name="신세계 아울렛";
      this.map="./assets/imgs/041-버튼-PPT 5페이지의 가운데 이미지의 전국지도 버튼-아울렛-신세계아울렛.png";
    }
    else if(this.id=="hyunout"){
      this.martflag="11";
      this.img="./assets/imgs/024-버튼-PPT 4페이지의 가운데 이미지의 아울렛별 로고-현대아울렛 CI.png";
      this.name="현대아울렛";
      this.map="./assets/imgs/042-버튼-PPT 5페이지의 가운데 이미지의 전국지도 버튼-아울렛-현대아울렛.png";
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
}
