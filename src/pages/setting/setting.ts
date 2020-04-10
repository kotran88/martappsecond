import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController,Platform,ViewController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LocaleDataIndex, LOCALE_DATA } from '@angular/common/src/i18n/locale_data';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';
import { isTrueProperty } from 'ionic-angular/umd/util/util';
import { componentFactoryName } from '@angular/compiler';
import undefined from 'firebase/empty-import';
import { HomePage } from '../home/home';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  version='V1.10.01';
  shownGroup = null;
  flag : boolean = false;

  test:any=false;
  buttontoggle=[
    {name:'7일 전',check:false},
    {name:'3일 전',check:false},
    {name:'1일 전',check:false},
    {name:'받지 않기',check:true},
  ];

  goBack(){
    this.navCtrl.push(HomePage);
  }

  toggleGroup() {
    this.flag=true;
    this.shownGroup=!this.shownGroup;
  };

  checkbutton(){
    var val=false;
    for(var i=0; i<this.buttontoggle.length;i++){
      if(this.buttontoggle[i].check==true)
      {
        if(i<3) val=true;
        else val=false;
      }
    }
    return val;
  }
  clickButton(i) {
    this.buttontoggle[i].check=!(this.buttontoggle[i].check);

    if(i==3){
      this.buttontoggle[0].check=false;
      this.buttontoggle[1].check=false;
      this.buttontoggle[2].check=false;
    }
    else this.buttontoggle[3].check=false;
    
    console.log(i,this.buttontoggle[i]);
  };

  checkButton(i){
    return this.buttontoggle[i]
  }

  alarmcheck(){
    for(var i=0;i<4;i++){
      console.log(i,this.buttontoggle[i]);
    }
    this.shownGroup=false;
    this.flag=false;
  }

  constructor(public modal:ModalController,
    private iab:InAppBrowser,private socialSharing:SocialSharing,private alertCtrl:AlertController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  evaluation(){
    //window.alert('evaluation');
    window.open('market://details?id=io.ionic.baekma', '_system');
  }

  license(){
    //window.alert('license');
    let modal=this.modal.create(licenseModalPage);
    modal.present();
  }

  email(){           
    //window.alert('email');
    var msg = "백화점 마트 헛걸음 방지 앱. '백마헛방' 쇼핑가기전엔 언제나 '백마헛방'";
    console.log(msg)
    //this.socialSharing.share(msg, null, null, null);
    this.socialSharing.shareViaEmail(null,'문의 사항',['superstepmall@gmail.com'],null);
  }

  privacy(){
    //window.alert('privacy');
    let modal=this.modal.create(privacyModalPage);
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
    
  }
}

@Component({
  template: `
  <ion-content class="main-view" style="background: transparent;
  background-color: white;
  outline-color=black;
  border: solid 1px;
  border-radius: 10px;
  height: 80%;
  width:80%;
  top: 10%;
  left:10%;
  " padding>
      
    <div class="modal_content">
        
          <div class="img">
               
        </div>
        <div class="footer">
          <button ion-button (click)="dismiss()">
          나가기
          </button>
        </div>
     
    </div>
    </ion-content>
    `
})

export class licenseModalPage{

  constructor(public platform: Platform,public params: NavParams,public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  template: `
  <ion-content class="main-view" style="background: transparent;
  background-color: white;
  outline-color=black;
  border: solid 1px;
  border-radius: 10px;
  height: 80%;
  width:80%;
  top: 10%;
  left:10%;
  " padding>
      
    <div class="modal_content">
        
          <div class="img">
               
        </div>
        <div class="footer">
          <button ion-button (click)="dismiss()">
          나가기
          </button>
        </div>
     
    </div>
    </ion-content>
    `
})

export class privacyModalPage{

  constructor(public platform: Platform,public params: NavParams,public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}