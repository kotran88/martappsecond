import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard'
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import { AdMobFree } from '@ionic-native/admob-free';
import { Observable } from 'rxjs';
/**
 * Generated class for the AddshopingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-addshoping',
  templateUrl: 'addshoping.html',
})
export class AddshopingPage {
  [x: string]: any;
  selected: any;
  totalnumber: any = 0;
  key: any;
  flag: boolean = false;
  firemain = firebase.database().ref();
  addinglist = [];
  adding: any;
  id: any;
  title: any;
  nowtime: any;
  a: any;
  price: any;
  sum: any = 0;
  value: any;
  flagg: any;
  printsum: any = 0;
  firstflag: any = false;
  flagInput: boolean = false;
  nextdirectory = this.firemain.child("id");
  fullyear: any;
  month: any;
  date: any;
  quantityArray: any;

  constructor(public speechRecognition: SpeechRecognition, public navCtrl: NavController,
    public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController,
    private keyboard: Keyboard, public admobFree: AdMobFree) {
    this.a = this.navParams.get("obj");
    this.id = this.navParams.get("id");
    this.title = this.navParams.get("title");
    this.value = this.navParams.get("flag");
    console.log("this.flag:" + this.value)
    this.key = this.navParams.get("key");
    this.keyboard.show();
    var thisday = new Date();
    thisday.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true })
    this.month = thisday.getMonth() + 1;
    this.date = thisday.getDate();
    var hour = thisday.getHours();
    var minute = thisday.getMinutes();
    this.fullyear = thisday.getFullYear();
    var second = thisday.getSeconds();
    console.log("this is the day");
    console.log("title " + this.title + " obj " + this.a + " id " + this.id + " value " + this.value);
    // new Date().toString("hh:mm tt")
    console.log(thisday)
    console.log(this.month + 1);
    console.log(this.date);
    console.log((hour) + "시");
    console.log(minute);
    console.log(this.fullyear)
    this.nowtime = "" + (this.month) + "월" + this.date + "일" + (hour) + "시" + minute + "분";
    this.quantityArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];

    this.admobFree.banner.hide();
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  add() {
    this.admobFree.banner.show();

    console.log(this.adding);
    if (this.price < 1 || this.price > 99999999) {
      this.price = 1;
      const toast = this.toastCtrl.create({
        message: '단가는 1원부터 99,999,999원까지 입력 가능합니다.',
        duration: 2000,
      });
      toast.present();
    }
    if (this.price == "" || this.price == undefined) { this.price = 1; }
    if (this.quantity == "" || this.quantity == undefined) { this.quantity = 1; }

    this.addinglist.push({ "name": this.adding, "checked2": false, "checked": false, "price": this.price, "quantity": this.quantity });
    this.totalnumber = this.addinglist.length;
    this.addprice();

    this.adding = "";
    this.price = "";
    this.quantity = "";

  }
  addprice() {
    /*가격받아오기*/
    console.log(this.price);
    console.log(this.addinglist);

    this.sum += Number(this.price) * Number(this.quantity);
    this.printsum = this.formatNumber(this.sum);
    console.log(this.sum);
    console.log(this.printsum);

  }

  priceandquantity() {
    this.flagInput = true;
    this.price = "";
    this.quantity = "";
    this.admobFree.banner.hide();
  }
  cancel() {
    this.flagInput = false;
    this.admobFree.banner.show();

  }
  addValue(v) {
    this.admobFree.banner.hide();
    console.log(v);
    var count = 0;
    console.log(v.checked);
    console.log(this.addinglist)
    for (var i = 0; i < this.addinglist.length; i++) {
      if (this.addinglist[i].checked == true) {
        count++;
      }
    }
    this.selected = count;
  }
  save() {
    console.log("addshoping saving....")
    this.flag = true;
    this.flagInput = false;
    let alert = this.alertCtrl.create({
      title: '작성 중이던 목록을 저장할까요?',
      cssClass: 'savealert',
      buttons: [
        {
          text: '아니요',
          role: 'cancel',
          handler: data => {
            this.firemain.child("users").child(this.id).child(this.value).child(this.title).remove().then(() => {
              console.log("Cancel");
            })

          }
        },
        {
          text: '예',
          handler: data => {
            this.admobFree.banner.show();

            console.log(this.addinglist);
            console.log(this.adding);
            console.log(this.id);
            console.log(this.key);
            console.log(this.value);
            console.log(this.title);

            if (this.addinglist.length == 0) {
              window.alert("목록을 입력해주세요.");
              this.add();
            }
            else {
              this.firemain.child("users").child(this.id).child(this.value).child(this.title).child(this.key).update({ "time": this.nowtime, "flag": "entered", "key": this.key })
              this.firemain.child("users").child(this.id).child(this.value).child(this.title).child(this.key).child("list").update(this.addinglist);
              this.navCtrl.pop();
            }
          }

        }

      ]
    });
    alert.present();
  }
  autosave() {
    this.flag = true;
    this.flagInput = false;
    if (this.addinglist.length == 0) {
      window.alert("목록을 입력해주세요.");
      this.add();
    }
    else {
      this.firemain.child("users").child(this.id).child(this.value).child(this.title).child(this.key).update({ "time": this.nowtime, "flag": "entered", "key": this.key })
      this.firemain.child("users").child(this.id).child(this.value).child(this.title).child(this.key).child("list").update(this.addinglist);
      this.navCtrl.pop();
    }
  }

  goBack() {
    if (this.addinglist.length == 0) {
      this.firemain.child("users").child(this.id).child(this.value).child(this.title).remove().then(() => {
        console.log("Cancel");
      })
      this.navCtrl.push(HomePage);
    }
    else {
      this.autosave();
      const toast = this.toastCtrl.create({
        message: '저장되었습니다.',
        duration: 2000,
        position: 'top',
        cssClass: 'deletemodalToast'
      });
      toast.present();
      this.navCtrl.push(HomePage);
    }
  }

  speeching() {

    let options = {
      "language": "ko-KR",
      "matches": 3,
      "prompt": "평소 말하는 것처럼 말해주세요",      // Android only
      "showPopup": true,  // Android only
      "showPartial": true
    }
    // Check permission
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        console.log(hasPermission)
      }).catch((e) => {
        window.alert(e)
      })
    this.speechRecognition.requestPermission()
      .then(
        () => {
          console.log('ㅎㅎㅎㅎㅎGranteddd')
          console.log("listened")
          console.log(options);
          // Start the recognition process

          // Check feature available
          this.speechRecognition.isRecognitionAvailable()
            .then((available: boolean) => {
              console.log(available)
              console.log("available")
            }).catch((e) => {
              console.log("failed")
              console.log(e);
            })
          // Start the recognition process
          console.log(this.speechRecognition)
          if (this.firstflag) {
            this.speechRecognition.startListening(options)
              .subscribe(
                (matches: string[]) => {

                  console.log("matched!")
                  console.log(matches)
                },
                (onerror) => console.log('error:', onerror)
              )
          }

          // Stop the recognition process (iOS only)
          this.speechRecognition.stopListening()
          // Get the list of supported languages
          console.log("goto getsupported language")
          this.speechRecognition.getSupportedLanguages()
            .then(
              (languages: string[]) => {
                console.log("listened")
                console.log(languages)


                this.adding = languages[0]
                this.add();
              },
              (error) => {
                console.log("errorrrorr")
                console.log(error)
                this.firstflag = true;


                this.speechRecognition.startListening(options)
                  .subscribe(
                    (matches: string[]) => console.log(matches),
                    (onerror) => console.log('error:', onerror)
                  )
                // Stop the recognition process (iOS only)
                this.speechRecognition.stopListening()
                // Get the list of supported languages
                this.speechRecognition.getSupportedLanguages()
                  .then(
                    (languages: string[]) => {
                      console.log("listened")
                      console.log(languages)


                      this.adding = languages[0]
                      this.add();

                    },
                    (error) => {
                      console.log("errorrrorr")
                      console.log(error)

                    }
                  )
              }
            )
        },
        () => console.log('Denied')
      )
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddshopingPage');
  }
}