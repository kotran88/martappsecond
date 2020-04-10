import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { AdMobFree } from '@ionic-native/admob-free';

@Component({
  selector: 'page-deletemodal',
  templateUrl: 'deletemodal.html',
})
export class DeletemodalPage {
  [x: string]: any;
  key:any;
  nextdirectory: any;
  id: any;
  firemain = firebase.database().ref();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public uniqueDeviceID: UniqueDeviceID, public admobFree: AdMobFree) {
    this.id = this.navParams.get("Id");
    this.key = this.navParams.get("key");
    this.nextdirectory = this.firemain.child("users").child(this.id);
    console.log(this.key);
  }
  goback(){
    this.navCtrl.pop();
  }
  
  delete(){
    console.log(this.key.flag);
    console.log(this.key.title);
    if (this.key.flag == "mart") {
      this.nextdirectory.child("mart").child(this.key.title).remove().then(() => {
        window.alert("삭제되었습니다.mart")
        console.log("success mart")
      }).catch((e) => {
        console.log("error" + e);
      })
    }
    if (this.key.flag == "dep") {
      this.nextdirectory.child("dep").child(this.key.title).remove().then(() => {
        window.alert("삭제되었습니다.dep")
        console.log("success dep")
      }).catch((e) => {
        console.log("error" + e);
      })
    }
    if (this.key.flag == "outlet") {
      this.nextdirectory.child("outlet").child(this.key.title).remove().then(() => {
        window.alert("삭제되었습니다.")
        console.log("success")
      }).catch((e) => {
        console.log("error" + e);
      })
    }
    if (this.key.flag == "etc") {
      this.nextdirectory.child("etc").child(this.key.title).remove().then(() => {
        window.alert("삭제되었습니다.")
        console.log("success")
      }).catch((e) => {
        console.log("error" + e);
      })
    }
    this.goback();
  }

}
