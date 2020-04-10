import { Component, ViewChild } from '@angular/core';
import { NavController, Navbar, AlertController, NavParams, FabContainer, ToastController, ModalController, ViewController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import firebase from 'firebase';
import * as $ from 'jquery'
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeBanner } from '@ionic-native/admob-free';
import { HomePage } from '../home/home';
import 'hammerjs'

import { Directive, ElementRef, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ViewlimitmodalPage } from '../viewlimitmodal/viewlimitmodal';


/**
 * Generated class for the ViewshoppinglistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-viewshoppinglist',
  templateUrl: 'viewshoppinglist.html',
})
export class ViewshoppinglistPage {
  @ViewChild(Navbar) navBar: Navbar;

  @Output('long-press') onPressRelease: EventEmitter<any> = new EventEmitter();
  [x: string]: any;
  firstflag: any = false;
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
  nextdirectory: any;
  a: any;
  name: any;
  price: any;
  sum: any = 0;
  printsum: any = 0;
  flagInput: boolean = false; //가격 및 수량도 입력하기 버튼을 위한 boolean형 변수
  addvalue: any;
  shop: any;
  count: any = 0;
  allbuy: boolean = false;
  number = [];
  checkflag: boolean = false;

  constructor(public speechRecognition: SpeechRecognition, public navParam: NavParams, public navCtrl: NavController,
    public navParams: NavParams, private iab: InAppBrowser,
    public alertCtrl: AlertController, private admobFree: AdMobFree,
    public toastCtrl: ToastController, public modal: ModalController, public viewCtrl: ViewController) {
    this.a = this.navParams.get("obj");
    this.id = this.navParams.get("id");
    this.nextdirectory = this.firemain.child(this.id);
    this.key = this.navParams.get("key");
    this.title = this.a.title;
    this.shop = this.navParams.get("flag");
    console.log(this.shop);
    console.log(this.a);
    console.log(this.a.list);
    for (var i = 0; i < this.a.list.length; i++) {
    }
    console.log(this.id);
    console.log(this.title);
    console.log(this.key);
    var thisday = new Date();
    thisday.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true })
    var month = thisday.getMonth();
    var date = thisday.getDate();
    var hour = thisday.getHours();
    var minute = thisday.getMinutes();
    var fullyear = thisday.getFullYear();
    var second = thisday.getSeconds();
    this.nowtime = "" + (month + 1) + "월" + date + "일" + (hour) + "시" + minute + "분";
    this.totalnumber = this.a.list.length;
    this.checkedbuy();
    this.addprice();

    for (var i = 1; i <= 50; i++) {
      this.number.push({ "count": i });
    }
  }

  backbutton() {
    if(this.flag == true){
      let alert = this.alertCtrl.create({

        title: '작성 중이던 목록을 저장할까요?',
        buttons: [
          {
            text: '아니요',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
              this.goback();
            }
          },
          {
            text: '예',
            handler: data => {
              for (var v = 0; v < this.a.list.length; v++) {
                console.log(this.a.list[v])
                console.log(this.a.list[v].name);
  
                if (this.a.list[v].name == "") {
                  window.alert("목록을 입력해주세요");
                }
                else {
                  window.alert("저장되었습니다.");
                  this.firemain.child("users").child(this.id).child(this.shop).child(this.title).child(this.key).update({ "time": this.nowtime, "flag": "entered", "key": this.key })
                  this.firemain.child("users").child(this.id).child(this.shop).child(this.title).child(this.key).child("list").update(this.a.list);
                  this.refreshname();
                  this.showToastWithCloseButton();
                  this.checkedbuy();
                }
              }
              console.log(this.a.list);
              console.log(this.shop);
              this.goback();
            }
          }
        ]
      });
      alert.present();
    }
    else{
      this.goback();
    }
  }

  goback() {
    this.navCtrl.pop();
  }

  pressed() {
    console.log("pressed")
    this.pressflag = true;
  }
  touchstart() {
    console.log("touchstart");
  }
  active() {
    console.log("active");
  }
  released() {
    // window.alert("released");
    console.log("releaseddddd" + this.pressflag);
    if (this.pressflag == true) {
      // window.alert("released2")
      // this.navCtrl.push(AddquestionPage,{"home":this.home,"first":this.firstvalue,"value":this.value,"flag:":"modify","array":v})
    }
    this.pressflag = false;
  }

  /*숫자에 콤마 찍기*/
  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  addprice() {
    /*가격받아오기*/
    this.firemain.child("users").child(this.id).child(this.shop).child(this.title).child(this.key).child("list").once("value", (snap) => {
      for (var a = 0; a < snap.val().length; a++) {
        this.sum += Number(snap.val()[a].quantity) * Number(snap.val()[a].price);
        this.printsum = this.formatNumber(this.sum);
      }
    })
  }

  /*check 여부 DB 불러오기 */
  checkedbuy() {
    var count = 0;
    this.firemain.child("users").child(this.id).child(this.shop).child(this.title).child(this.key).child("list").once("value", (snap) => {
      for (var a = 0; a < snap.val().length; a++) {
        if (snap.val()[a].checked == true) {
          count++;
        }
      }
      this.selected = count;
    })
  }

  /*새로고침*/
  refreshname() {
    this.a.list = [];
    var sum = 0;
    this.firemain.child("users").child(this.id).child(this.shop).child(this.title).child(this.key).child("list").once("value", (snap) => {
      for (var a = 0; a < snap.val().length; a++) {
        if (snap.val()[a].name = "") {
          snap.val()[a].name = "-"
        }
        console.log(snap.val()[a].name, snap.val()[a].checked, snap.val()[a].price, snap.val()[a].quantity)
        sum += Number(snap.val()[a].quantity) * Number(snap.val()[a].price);//가격 다시 받기
        this.printsum = this.formatNumber(sum);
        this.a.list.push({ "name": snap.val()[a].name, "checked2": false, "checked": snap.val()[a].checked, "price": snap.val()[a].price, "quantity": snap.val()[a].quantity, "del": this.checkflag });
      }
      console.log(sum);
    })
  }

  public srct = {
    text: '',
    url: ''
  }

  add() {
    console.log(this.a.list);
    if (this.a.list.length < 50) {
      if (this.price < 1 && this.price > 99999999) {
        this.price = 1;
        const toast = this.toastCtrl.create({
          message: '단가는 99,999,999원까지 입력 가능합니다.',
          duration: 2000,
        });
        toast.present();
      }
      if (this.price == "") { this.price = 1; }
      if (this.quantity == "") { this.quantity = 1; }
      this.a.list.push({ "name": this.adding, "checked2": false, "checked": false, "price": this.price, "quantity": this.quantity });
      this.totalnumber = this.a.list.length;
      this.adding = "";
      this.price = "";
      this.quantity = "";
    }
    else if (this.a.list.length >= 50) {
      let modal = this.modal.create(ViewlimitmodalPage, null, {
        cssClass: "modalSize"
      });
      modal.present();
      for (var v = 0; v < this.a.list.length; v++) {
        console.log(this.a.list[v])
        console.log(this.a.list[v].name);

        if (this.a.list[v].name == "") {
          window.alert("목록을 입력해주세요");
        }
        else {
          this.firemain.child("users").child(this.id).child(this.shop).child(this.title).child(this.key).update({ "time": this.nowtime, "flag": "entered", "key": this.key })
          this.firemain.child("users").child(this.id).child(this.shop).child(this.title).child(this.key).child("list").update(this.a.list);
          this.refreshname();
          // this.showToastWithCloseButton();
          // this.checkedbuy();
        }
      }
    }

  }

  /*가격 및 수량도 입력하기*/
  priceandquantity() {
    this.flagInput = true;
  }

  /*취소버튼*/
  cancel() {
    this.flagInput = false;
  }
  addValue(v, idx) {
    var count = 0;
    console.log(v);
    console.log(v.checked);
    console.log(idx)
    if (v.checked) {
      v.checked = false;
    } else {
      v.checked = true;
    }

    console.log(this.a.list);
    console.log(this.a.list.length);

    for (var i = 0; i < this.a.list.length; i++) {
      if (this.a.list[i].checked == true) {
        count++;
        console.log(count);
      }
    }
    this.selected = count;
    console.log(this.a.title);
    if (this.selected == this.a.list.length) {
      this.allbuy = true;
      const toast = this.toastCtrl.create({
        message: this.a.title + " " + this.a.list.length + ' 품목 구입 완료 되었습니다.',
        duration: 2000,
      });
      toast.present();
    }
    var checked = []; //선택된 것을 넣을 수 있는 새로운 배열
    var unchecked = []; //선택되지 않은 것을 넣을 수 있는 새로운 배열.

    for (var i = 0; i < this.a.list.length; i++) {
      if (this.a.list[i].checked == true) {
        checked.push(this.a.list[i]);
        console.log(checked);
      }
      else if (this.a.list[i].checked == false) {
        unchecked.push(this.a.list[i]);
        console.log(unchecked);
      }
    }
    console.log(checked);
    console.log(unchecked);
    this.a.list = [];
    for (var i = 0; i < unchecked.length; i++) {
      this.a.list.push(unchecked[i])
    }
    for (var i = 0; i < checked.length; i++) {
      this.a.list.push(checked[i])
    }

    console.log(this.a.list);
  }

  checkValue(v) {
    var count = 0;
    this.checkflag = true;
    console.log(v);
    console.log(v.checked);
    v.checked = true;
    console.log(this.a.list);
    console.log(this.a.list.length);

    for (var i = 0; i < this.a.list.length; i++) {
      if (this.a.list[i].checked == true) {
        count++;
        console.log(count);
      }
    }
    this.selected = count;
    console.log(this.a.list);
  }
  save() {
    this.flag = false;
    this.flagInput = false;

    let alert = this.alertCtrl.create({

      title: '작성 중이던 목록을 저장할까요?',
      buttons: [
        {
          text: '아니요',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '예',
          handler: data => {
            for (var v = 0; v < this.a.list.length; v++) {
              console.log(this.a.list[v])
              console.log(this.a.list[v].name);

              if (this.a.list[v].name == "") {
                window.alert("목록을 입력해주세요");
              }
              else {
                this.firemain.child("users").child(this.id).child(this.shop).child(this.title).child(this.key).update({ "time": this.nowtime, "flag": "entered", "key": this.key })
                this.firemain.child("users").child(this.id).child(this.shop).child(this.title).child(this.key).child("list").update(this.a.list);
                this.refreshname();
                this.showToastWithCloseButton();
                this.checkedbuy();
              }
            }
            console.log(this.a.list);
            console.log(this.shop);

          }
        }
      ]
    });
    alert.present();
  }
  /*수정*/
  insertData(fab: FabContainer) {
    this.flag = true;
  }
  delflag1: boolean = false;
  /*삭제*/
  delete(fab: FabContainer) {

    this.delflag1 = true;
    if (!this.flag) {

      this.flag = true;
    }

    console.log(this.delflag1);
    const toast = this.toastCtrl.create({
      message: '삭제를 원하시는 품목을 눌러주세요.',
      duration: 2000,
    });
    toast.present();
    // window.alert(this.flag);
  }
  delflag2: boolean = false;
  delNameArray = [];
  del(name) {
    // this.delflag1 = true;
    console.log(name);
    if (this.delNameArray.indexOf(name.name) == -1) {
      name.checked2 = true;
      this.delNameArray.push(name.name);
    }
    else if (this.delNameArray.indexOf(name.name) > -1) {
      name.checked2 = false;
      console.log("aready!");
      console.log(this.delNameArray);
      for (var a in this.delNameArray) {
        if (this.delNameArray[a] == name.name) {
          console.log(this.delNameArray[a]);
          this.delNameArray[a] = "NC";
        }
      }
      var filtered = this.delNameArray.filter(function (value) {
        return value != "NC";
      })
      this.delNameArray = filtered;
      console.log(this.delNameArray);
    }
    console.log(this.delNameArray);
  }
  del2() {
    let alert = this.alertCtrl.create({
      title: '정말로 삭제하시겠습니까?',
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '확인',
          handler: data => {
            console.log(this.a.list);
            window.alert("삭제되었습니다.");
            for (var i = 0; i < this.a.list.length; i++) {
              for (var j in this.delNameArray) {

                if (this.a.list[i].name == this.delNameArray[j]) {
                  this.a.list[i] = "NC"
                }
              }
            }

            var filtered = this.a.list.filter(function (value) {
              return value != "NC";
            })

            this.a.list = filtered;
            console.log(this.a.list);
            /*입력 리스트에서 삭제된 항목을 firebase에서 삭제하기위해 list 삭제*/
            this.firemain.child("users").child(this.id).child(this.shop).child(this.title).child(this.key).child("list").once("value", (snap) => {
              for (var a in snap.val()) {
                this.firemain.child("users").child(this.id).child(this.shop).child(this.title).child(this.key).child("list").remove().then(() => {
                  console.log("success")
                }).catch((e) => {
                  console.log("error" + e);
                })
              }
              /*삭제한 list를 update를 통해 수정된 데이터로 다시 넣어줌 */
              this.firemain.child("users").child(this.id).child(this.shop).child(this.title).child(this.key).child("list").update(this.a.list).then(() => {
                console.log(this.a.list);
              });

              /*totalNumber와 Select값 가져오기*/
              this.totalnumber = this.a.list.length;
              var count = 0;
              for (var i = 0; i < this.a.list.length; i++) {
                if (this.a.list[i].checked == true) {
                  count++;
                }
              }
              this.refreshname(); //새로고침
            })
          }
        }
      ]
    });
    alert.present();
  }
  delcancle() {
    this.delflag1 = false;
    this.delNameArray = [];
  }
  check: any;

  /*sort구현*/
  sortlist(fab: FabContainer) {

    let alert = this.alertCtrl.create({

      title: '정렬하시겠습니까?',
      buttons: [
        {
          text: '아니요',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '예',
          handler: data => {
            var checked = []; //선택된 것을 넣을 수 있는 새로운 배열
            var unchecked = []; //선택되지 않은 것을 넣을 수 있는 새로운 배열.

            for (var i = 0; i < this.a.list.length; i++) {
              if (this.a.list[i].checked == true) {
                checked.push(this.a.list[i]);
                console.log(checked);
                checked.sort(function (name1, name2) {
                  return name1.name.toLowerCase() < name2.name.toLowerCase() ? -1 : name1.name.toLowerCase() > name2.name.toLowerCase() ? 1 : 0;
                });
              }
              else if (this.a.list[i].checked == false) {
                unchecked.push(this.a.list[i]);
                console.log(unchecked);
                unchecked.sort(function (name1, name2) {
                  return name1.name.toLowerCase() < name2.name.toLowerCase() ? -1 : name1.name.toLowerCase() > name2.name.toLowerCase() ? 1 : 0;
                });
              }
              console.log("checkresult : ");
              console.log(checked)
              console.log("uncheckedresult :");
              console.log(unchecked)

            }
            this.a.list = [];

            for (var i = 0; i < unchecked.length; i++) {
              this.a.list.push(unchecked[i])
            }
            for (var i = 0; i < checked.length; i++) {
              this.a.list.push(checked[i])
            }
            //   var sortingField = "distance";
            //   this.storearray.sort(function(a,b) { // 오름차순
            //     // return (a[sortingField] === b[sortingField])? 0 : a[sortingField]? -1 : 1;
            //     var x = a[sortingField]; var y = b[sortingField];
            //         return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            // });


            // this.a.list.sort(function (name1, name2) {
            //   return name1.name.toLowerCase() < name2.name.toLowerCase() ? -1 : name1.name.toLowerCase() > name2.name.toLowerCase() ? 1 : 0;
            // });

            console.log(this.a.list);
            window.alert("정렬되었습니다.");
            this.firemain.child("users").child(this.id).child(this.shop).child(this.title).child(this.key).child("list").update(this.a.list).then(() => {
              console.log(this.a.list);
            });
          }
        }
      ]
    });
    alert.present();
  }

  /*가격비교 검색*/
  select_sort(c) {
    console.log(c);
    this.srct.url = 'https://msearch.shopping.naver.com/search/all.nhn?origQuery=' + this.a.list[c].name + '&pagingIndex=1&pagingSize=40&viewType=list&sort=' + $("#slt").val() + '&frm=NVSHATC&query=' + this.a.list[c].name;

    console.log(this.srct.url);
    const browser = this.iab.create(this.srct.url, "_blank", "location=no,toolbar=no");

    browser.on('loadstop').subscribe(event => {
      browser.insertCSS({ code: "body{color: red;}" });
    });
  }

  /*토스트버튼*/
  showToastWithCloseButton() {
    if (this.selected >= 0) {
      const toast = this.toastCtrl.create({
        message: this.totalnumber + '개 중 ' + this.selected + ' 개 구입 완료.',
        duration: 2000,
      });
      toast.present();
    }
  }
  speeching2() {
    window.alert("2")
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
    // let options = {
    //   "language": "ko-KR",
    //   "matches": 1,
    //   "prompt": "평소 말하는 것처럼 말해주세요qqqqqqqq",      // Android only
    //   "showPopup": true,  // Android only
    //   "showPartial": true
    // }
    // window.alert("speech started")
    //  // Check permission
    //  this.speechRecognition.hasPermission()
    //  .then((hasPermission: boolean) => {console.log(hasPermission)
    // window.alert("g!")
    // }).catch((e)=>{
    //   window.alert(e)
    // })
    // Request permissions
    //  this.speechRecognition.requestPermission()
    //    .then(
    //      () => {console.log('ㅎㅎㅎㅎㅎGranteddd')
    //    window.alert("1111")
    //      console.log("listened")
    //      console.log(options);
    //    // Start the recognition process

    //       // Check feature available
    //       this.speechRecognition.isRecognitionAvailable()
    //         .then((available: boolean) => console.log(available)).catch((e) => {
    //           console.log(e);
    //         })
    //       // Start the recognition process
    //       this.speechRecognition.startListening(options)
    //         .subscribe(
    //           (matches: string[]) => console.log(matches),
    //           (onerror) => console.log('error:', onerror)
    //         )
    //       // Stop the recognition process (iOS only)
    //       this.speechRecognition.stopListening()
    //       // Get the list of supported languages
    //       this.speechRecognition.getSupportedLanguages()
    //         .then(
    //           (languages: string[]) => {
    //             console.log("listened")
    //             console.log(languages)


    //           this.adding=languages[0]
    //           },
    //           (error) => {
    //             console.log("errorrrorr")
    //             console.log(error)

    //           }
    //         )


    //    },
    //      () => console.log('Denied')
    //    )


  }
}
