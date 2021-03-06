import { Component, ViewChild, ContentChild } from '@angular/core';
import { NavController, AlertController, Platform, ViewController, NavParams, ModalController, FabContainer, UrlSerializer, ToastController, LoadingController, Img } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free'
import { CallNumber } from '@ionic-native/call-number/';
import firebase from 'firebase';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { AddshopingPage } from '../addshoping/addshoping';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import * as $ from 'jquery'
import { ViewshoppinglistPage } from '../viewshoppinglist/viewshoppinglist';

import { SocialSharing } from '@ionic-native/social-sharing';
import { SettingPage } from '../setting/setting';
import { AdPage } from '../ad/ad';
import { RatePage } from '../rate/rate';
import { CopymodalPage } from '../copymodal/copymodal';
import { snapshotChanges } from 'angularfire2/database';
import { ListlimitmodalPage } from '../listlimitmodal/listlimitmodal';
import { OneSignal } from '@ionic-native/onesignal';
import { MartlistPage } from '../martlist/martlist';
import { MartinfoviewPage } from '../martinfoview/martinfoview';
import { FavoritemodalPage } from '../favoritemodal/favoritemodal';
import { DeletemodalPage } from '../deletemodal/deletemodal';

import { Keyboard } from '@ionic-native/keyboard'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fabButtonOpened: any = false;
  [x: string]: any;
  selectedvalue: any;
  value: any;
  firemain = firebase.database().ref();
  shoppingPlace: any;
  newarraylist = [];
  // id: any = "a2f05b91-956a-b480-3525-991002905558"
  id: any;
  tab = "tab1";
  title: any;
  backdrop: any = true;
  key: any;
  nextdirectory: any;
  count: any = 0;
  selected: any;
  copyflag: any = false;
  checkedlistlength: any = 0;
  tocopylist: any;
  tocopy: any;
  selectedflagtocpy: any;
  listcount: any = 0;
  afterValue: any;
  favoriteList = [];
  logo = [];

  day: any;

  month: any;
  dayofweek: any;
  weekarr = [];
  today = [];
  todayoff: any;
  martkind = [];
  martinfo = [];

  shopping: boolean = false;
  offday = [];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  date = new Date();
  weekNo: any;
  thismonth = [];
  week = [];
  offdayyear = [];
  offdayname: any;
  firstDate = new Date(this.year, this.month, 1).getDay();//첫날의 요일
  lastDate = new Date(this.year, this.month + 1, 0);//마지막 날의 요일
  newDate() {
    var days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    var prefixes = ['첫째주', '둘째주', '셋째주', '넷째주', '다섯째주'];
    this.currentMonth = this.date.getMonth() + 1;

    this.currentYear = this.date.getFullYear();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var dayofweek = this.date.getDay();
    this.currentDate = new Date().getDate();

    console.log(firstDayThisMonth);
    // for(var index=0; index<7; index++){
    //   var v_date_str = this.currentYear+"-"+this.currentMonth+"-"+this.currentDate;

    //     var todayDate = this.currentDate+1;
    //     todayDate = this.currentDate++;
    //     // this.currentDate = todayDate++;
    //     console.log(todayDate+"일");
    //     dateeeee = new Date(v_date_str);
    //     var resnum = dateeeee.getDate();
    //     var aaaa = resnum+firstDayThisMonth;
    //     console.log(resnum-firstDayThisMonth);
    //     var resultWeek = Math.ceil(aaaa/7);
    //   // var resultWeek = Math.ceil(dateeeee.getDate()/7);
    //   console.log(resultWeek+"주");
    // }


    console.log(this.currentDate);
    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }
    var count = 0;
    for (var i = 0; i < 7; i++) {
      console.log(thisNumOfDays);
      var dow = dayofweek++;
      var todayDate = this.currentDate++;
      console.log(todayDate + "일");
      var resnum = this.currentDate + firstDayThisMonth;
      var resultWeek = Math.ceil(resnum / 7);
      console.log(resultWeek + "주");

      if (dayofweek >= 7) { dayofweek = 0; }

      if (todayDate <= thisNumOfDays) {
        this.week.push({ "week": prefixes[resultWeek - 1], "month": this.currentMonth, "day": todayDate, "dayofweek": days[dow] }); //30일
      }
      else if (todayDate > thisNumOfDays) {
        count++;
        this.week.push({ "week": prefixes[resultWeek - 1], "month": this.currentMonth + 1, "day": count, "dayofweek": days[dow] }); //30일
      }
    }
  }
  onEnter() {
    this.select_sort();
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'loading'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }

  martview(martinfo) {
    // console.log(martinfo);
    this.navCtrl.push(MartinfoviewPage, { "martinfo": martinfo, "id": this.id });
  }

  area: any;
  martname: any;
  kindofmart: any;
  favorite() {
    var count = 0;
    this.favoriteList = [];
    console.log("this id is : " + this.id);
    this.firemain.child("users").child(this.id).child("favorite").once("value", (sn) => {
      // console.log(sn.val());
      for (var i in sn.val()) {
        // console.log(i);
        this.martkind.push(i);
        console.log(sn.val()[i]);
        for (var j in sn.val()[i]) {
          count++
          this.todayoff = sn.val()[i][j].dayoffarray[1];
          // console.log(this.todayoff);
          // console.log(sn.val()[i][j].dayoffarray);
          this.favoriteList.push(sn.val()[i][j]);
          // console.log(this.favoriteList);
          this.vacationFunc(this.week, sn.val()[i][j], count);
        }
      }
      console.log("favorite list is")
      console.log(this.favoriteList);
      console.log("first is : ");
      console.log(this.favoriteList[0])
      this.firemain.child("users").child(this.id).child("setting").update({"first":this.favoriteList[0]});
    })

    var count=0;
   

    for(var a in this.favoriteList){
      count++;
      console.log("count is : "+count);
      if(count==1){
        console.log("first is : "+this.favoriteList[a])
      }
    }
    if (this.favoriteList.length >= 20) {
      let modal = this.modal.create(FavoritemodalPage);
      modal.present();

    }
  }

  weekcheck(number, mart) {
    console.log(number);
    console.log(mart);
    var returnvalue = "";
    if (mart.vacation.indexOf("월요") > -1) {
      returnvalue = "월요일";
    }
    if (mart.vacation.indexOf("화요") > -1) {
      returnvalue = "화요일";
    }
    if (mart.vacation.indexOf("수요") > -1) {
      returnvalue = "수요일";
    }
    if (mart.vacation.indexOf("목요") > -1) {
      returnvalue = "목요일";
    }
    if (mart.vacation.indexOf("금요") > -1) {
      returnvalue = "금요일";
    }
    if (mart.vacation.indexOf("토요") > -1) {
      returnvalue = "토요일";
    }
    if (mart.vacation.indexOf("일요") > -1) {
      returnvalue = "일요일";
    }
    console.log(returnvalue);
    return returnvalue
  }
  cnt: any;
  dayoffarray = [];
  vacationFunc(week, mart, count) {
    // console.log(week);
    // console.log(mart.vacation);
    // console.log(count);
    this.cnt = count;
    // console.log(this.cnt);
    var counting = 0;
    this.dayoffarray = [];
    for (var a in week) {
      counting++;
      var flag = false;
      if (counting == 1) {
        console.log("오늘은 " + week[a].week + " " + week[a].day + "일 " + week[a].dayofweek);
      }
      if (mart.vacation.indexOf("첫째") > -1) {
        if (week[a].week.indexOf("첫째") > -1 && week[a].week.indexOf("둘째") > -1) {
          var weekoff = this.weekcheck("1", mart);
          console.log("off is : " + weekoff);
          console.log(weekoff + "1111,,," + week[a].dayofweek);
          if (this.dayoffarray.length > 6) {
            console.log("hi");
          }
          else if (this.dayoffarray.length <= 6) {
            if (week[a].week.indexOf("첫째") != 0) {
              console.log("1 add 1")
              this.dayoffarray.push("영업")
            } else {
              if (weekoff == week[a].dayofweek) {
                console.log("1 add 2")
                this.dayoffarray.push("휴무")
              } else {
                console.log("1 add 3")
                this.dayoffarray.push("영업")
              }
            }
          }
        }
      }
      if (mart.vacation.indexOf("둘째") > -1) {
        console.log("2th week")
        console.log(mart)
        console.log(week[a].week)
        if (week[a].week.indexOf("둘째") > -1 || week[a].week.indexOf("셋째") > -1) {
          var weekoff = this.weekcheck("2", mart)
          console.log("off is : " + weekoff)
          console.log(weekoff + "2222,,," + week[a].dayofweek);;
          console.log(this.week);
          if (this.dayoffarray.length > 6) {
            console.log("hi");
          }
          else if (this.dayoffarray.length <= 6) {
            if (week[a].week.indexOf("둘째") != 0) {
              console.log("2 add 1")
              this.dayoffarray.push("영업")
              flag = true;
            } else {
              if (weekoff == week[a].dayofweek) {
                console.log("2 add 2")
                this.dayoffarray.push("휴무")
                flag = true;
              } else {
                console.log("2 add 3")
                this.dayoffarray.push("영업")
                flag = true;
              }
            }
          }
        }
      }
      if (mart.vacation.indexOf("셋째") > -1) {
        console.log("3th week")
        if (week[a].week.indexOf("셋째") > -1 && week[a].week.indexOf("넷째") > -1) {
          var weekoff = this.weekcheck("3", mart)
          console.log("weekoff" + " : " + weekoff)
          console.log("off is : " + weekoff);
          console.log(weekoff + "333,,," + week[a].dayofweek);
          if (this.dayoffarray.length > 6) {
            console.log("hi");
          }
          else if (this.dayoffarray.length <= 6) {
            if (week[a].week.indexOf("셋째") != 0) {
              console.log("3 add 1")
              this.dayoffarray.push("영업")
            } else {
              if (weekoff == week[a].dayofweek) {
                this.dayoffarray.push("휴무")
                console.log("3 add 2")
              } else {
                this.dayoffarray.push("영업")
                console.log("3 add 3")
              }
            }
          }
        }
      }
      if (mart.vacation.indexOf("넷째") > -1) {
        console.log("4th week")
        var weekoff = this.weekcheck("4", mart)
        console.log("off is : " + weekoff);
        console.log(week[a].week + ",," + weekoff + "444,,,,," + week[a].dayofweek);
        console.log("flag is : " + flag)
        if (this.dayoffarray.length > 6) {
          console.log("hi");
        }
        else if (this.dayoffarray.length <= 6) {
          if (week[a].week.indexOf("넷째") != 0) {
            console.log("4 add 1")
            if (!flag) {
              this.dayoffarray.push("영업")
            } else {
              flag = false;
            }

          } else {
            if (weekoff == week[a].dayofweek) {
              console.log("4 add 2")
              if (!flag) {
                this.dayoffarray.push("휴무")
              } else {
                flag = false;
              }

            } else {
              console.log("4 add 3")
              if (!flag) {
                this.dayoffarray.push("영업")
              } else {
                flag = false;
              }
            }
          }
        }
      }
      else {

        if (this.dayoffarray.length <= 6) {
          this.dayoffarray.push("영업");
        }
      }
      this.favoriteList[count - 1].dayoffarray = this.dayoffarray;
    }

  }
  favoriteIndex: any;

  bookmark(a, idx) {
    var newnametoinput = "";
    if (a.name.indexOf("롯데마트") > -1) { newnametoinput = "lotte"; }
    if (a.name.indexOf("이마트") > -1 && a.name.indexOf("트레이더스") == -1) { newnametoinput = "emart"; }
    if (a.name.indexOf("홈플러스") > -1) { newnametoinput = "homeplus"; }
    if (a.name.indexOf("코스트코") > -1) { newnametoinput = "costco"; }
    if (a.name.indexOf("이마트트레이더스") > -1) { newnametoinput = "traders"; }
    if (a.name.indexOf("롯데백화점") > -1) { newnametoinput = "lottedep"; }
    if (a.name.indexOf("신세계백화점") > -1) { newnametoinput = "sinsaegae"; }
    if (a.name.indexOf("현대백화점") > -1) { newnametoinput = "hyundai"; }
    if (a.name.indexOf("롯데 아울렛") > -1) { newnametoinput = "lotteoutlet"; }
    if (a.name.indexOf("신세계 아울렛") > -1) { newnametoinput = ""; }
    if (a.name.indexOf("현대 아울렛") > -1) { newnametoinput = ""; }

    console.log(newnametoinput)
    this.favoriteIndex = idx;
    this.martinfo = a;
    console.log(this.martinfo);
    console.log(this.martkind);
    console.log(a);
    console.log(a.key)
    console.log(idx);

    this.firemain.child("users").child(this.id).child("favorite").child(newnametoinput).child(a.key).remove();
    const toast = this.toastCtrl.create({
      message: '"즐겨 찾는 곳"에서 삭제되었습니다.',
      duration: 2000,
      position: 'top',
      cssClass: 'myToast'
    });
    toast.present();
    this.navCtrl.push(HomePage);

  }

  main() {
    this.navCtrl.push(MartlistPage, { "id": this.id }).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        this.init();

      });
    });
  }

  openFabButton() {
    console.log("openfab button")
    if (this.fabButtonOpened == false) {
      this.fabButtonOpened = true;
    } else {
      this.fabButtonOpened = false;
    }
  }

  refreshname() {
    // console.log(this.newarraylist);
    console.log("refresh come!!!");
    console.log(this.id);
    this.newarraylist = [];
    this.firemain.child("users").child(this.id).once("value", (sn) => {
      for (var a in sn.val()) {
        console.log("a is : " + a);
        if (a != "setting" && a != "favorite" && a != "deviceID") {
          // console.log(sn.val()[a]);
          for (var b in sn.val()[a]) {
            this.listcount++;
            // console.log("b" + b);
            // console.log(sn.val()[a][b]);
            for (var c in sn.val()[a][b]) {
              // console.log("c" + c);
              // console.log(sn.val()[a][b][c]);
              var checked = 0;
              var listlength = 0;
              for (var d in sn.val()[a][b][c].list) {
                // console.log(sn.val()[a][b][c].list.length)
                listlength = sn.val()[a][b][c].list.length;
                // console.log(sn.val()[a][b][c].list[d]);
                if (sn.val()[a][b][c].list[d].checked == true) {
                  checked++;
                }
              }
              console.log(sn.val()[a][b][c])
              var aa = sn.val()[a][b][c].time.split("일");
              console.log(aa[0]);
              var bb = aa[0].split("월");
              console.log(bb[0]);
              console.log(bb[1]);
              console.log(this.currentMonth);
              console.log(this.currentDate);
              console.log(this.currentYear);
              this.offdayyear = [
                { "year": "2020", "seol": "1월25", "chuseok": "10월1" },
                { "year": "2021", "seol": "2월12", "chuseok": "9월21" },
                { "year": "2022", "seol": "2월1", "chuseok": "9월10" },
                { "year": "2023", "seol": "1월22", "chuseok": "9월29" },
                { "year": "2024", "seol": "2월10", "chuseok": "9월17" },
                { "year": "2025", "seol": "1월29", "chuseok": "10월6" },
                { "year": "2026", "seol": "2월17", "chuseok": "9월25" },
                { "year": "2027", "seol": "2월7", "chuseok": "9월15" },
                { "year": "2028", "seol": "1월27", "chuseok": "10월3" },
                { "year": "2029", "seol": "2월13", "chuseok": "9월22" },
                { "year": "2030", "seol": "2월3", "chuseok": "9월12" },
              ];
              for (var off in this.offdayyear) {
                if (this.offdayyear[off].year == this.currentYear) {
                  if (this.offdayyear[off].seol == this.currentMonth + "월" + this.currentDate) {
                    console.log(this.currentMonth + "월" + this.currentDate);
                    this.offdayname = "설날";
                  }
                  if (this.offdayyear[off].chuseok == this.currentMonth + "월" + this.currentDate) {
                    console.log(this.currentMonth + "월" + this.currentDate);
                    this.offdayname = "추석";
                  }
                  else if (this.offdayyear[off].seol != this.currentMonth + "월" + this.currentDate && this.offdayyear[off].chuseok != this.currentMonth + "월" + this.currentDate) { this.offdayname = "" }
                  console.log(this.offdayname);
                }
              }
              console.log(this.week);
              for (var off2 in this.week) {
                for (var off3 in this.offdayyear) {
                  if (this.offdayyear[off3].year == this.currentYear) {

                    if (this.week[off2].month + "월" + this.week[off2].day == this.offdayyear[off3].seol) {
                      console.log("설날");
                      this.today[off2] = "설날";
                      console.log(this.today);
                      this.dayoffarray[off2] = "휴무";
                      console.log(this.dayoffarray);
                      console.log(this.cnt);
                      for (var count = 0; count < this.cnt; count++) {
                        console.log(count);
                        this.favoriteList[count].dayoffarray = this.dayoffarray;
                      }
                    }
                    if (this.week[off2].month + "월" + this.week[off2].day == this.offdayyear[off3].chuseok) {
                      console.log("추석");
                      this.today[off2] = "추석";
                      console.log(this.today);
                      this.dayoffarray[off2] = "휴무";
                      console.log(this.dayoffarray);
                      console.log(this.cnt);
                      for (var count = 0; count < this.cnt; count++) {
                        console.log(count);
                        this.favoriteList[count].dayoffarray = this.dayoffarray;
                      }
                    }
                  }
                }
              }
              console.log(this.offdayyear);
              if (this.currentMonth == bb[0]) {
                if (this.currentDate == bb[1]) {
                  console.log("오늘");
                  this.newarraylist.push({ "checked2": false, "totallist": listlength, "totalchecked": checked, "flag": a, "list": sn.val()[a][b][c].list, "title": b, "time": "오늘" + sn.val()[a][b][c].time, "key": sn.val()[a][b][c].key })
                }
                if (this.currentDate - 1 == bb[1]) {
                  console.log("어제");
                  this.newarraylist.push({ "checked2": false, "totallist": listlength, "totalchecked": checked, "flag": a, "list": sn.val()[a][b][c].list, "title": b, "time": "어제" + sn.val()[a][b][c].time, "key": sn.val()[a][b][c].key })
                }
                else if (this.currentDate != bb[1] && this.currentDate - 1 != bb[1]) {
                  console.log("다른 날");
                  this.newarraylist.push({ "checked2": false, "totallist": listlength, "totalchecked": checked, "flag": a, "list": sn.val()[a][b][c].list, "title": b, "time": sn.val()[a][b][c].time, "key": sn.val()[a][b][c].key })
                }
              }
              else if (this.currentMonth != bb[0]) {
                this.newarraylist.push({ "checked2": false, "totallist": listlength, "totalchecked": checked, "flag": a, "list": sn.val()[a][b][c].list, "title": b, "time": sn.val()[a][b][c].time, "key": sn.val()[a][b][c].key })
              }

            }
          }
          // console.log(this.listcount);
        }
      }
    })
    this.listcount = 0;
  }

  public srct = {
    text: '',
    url: '',
  }

  segmentChanged(e) {
    console.log(e);
  }
  callnumbering() {
    // window.alert("call number start")
    this.callnumber.callNumber("0630000000", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  regularShare() {
    var msg = "백화점 마트 헛걸음 방지 앱\n '백마헛방'\n 쇼핑가기전엔 언제나\n '백마헛방'";
    console.log(msg)
    this.socialSharing.share(msg, null, null, null);
  }

  addlist(value) {
    this.admobFree.banner.hide();
    this.selectedvalue = value;
    let alert = this.alertCtrl.create({
      title: '쇼핑 목록 명을 적어주세요',
      cssClass: 'addClass',
      inputs: [
        {
          name: 'title',
          placeholder: '쇼핑 목록명'
        }
      ],
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
            var limitarray = [];
            console.log(this.listcount);
            console.log(value);
            if (this.listcount >= 50) {
              this.navCtrl.push(ListlimitmodalPage, { "flag": this.selectedvalue, "obj": this.newarraylist, "title": data.title, "id": this.id, "key": value.key }).then(() => {
                this.navCtrl.getActive().onDidDismiss(data => {
                  if (data.value) {
                    console.log(data.value);
                    for (var a = 0; a < this.newarraylist.length; a++) {
                      console.log(data.value.title);
                      if (this.newarraylist[a].title == data.value.title) {
                        this.nextdirectory.child(this.newarraylist[a].flag).child(this.newarraylist[a].title).remove().then(() => {
                          console.log("success");
                        })
                      }
                    }
                  }
                  else {
                    console.log("success");
                  }

                })
              })
            }
            else {
              var key = this.nextdirectory.push().key;
              console.log("selected value" + this.selectedvalue);
              this.navCtrl.push(AddshopingPage, { "flag": this.selectedvalue, "key": key, "id": this.id, "title": data.title }).then(() => {
                this.navCtrl.getActive().onDidDismiss(data => {
                  console.log("dismiss detect");
                  this.refreshname();
                })
              });
            }
          }
        }
      ]
    });
    alert.present();
  }


  deleteDB(key, fab) {
    fab.close();
    console.log("delete come");
    console.log(key);
    console.log(this.nextdirectory);
    console.log(key.title);
    console.log(key.flag);

    let alert = this.alertCtrl.create({
      title: '삭제하시겠습니까?',
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            const toast = this.toastCtrl.create({
              message: '취소되었습니다.',
              duration: 2000,
              position: 'top',
              cssClass: 'deletemodalToast'
            });
            toast.present();
          }
        },
        {
          text: '확인',
          handler: data => {
            if (key.flag == "mart") {
              this.nextdirectory.child("mart").child(key.title).remove().then(() => {
                console.log("success mart")
                this.refreshname();
                toast.present();
              }).catch((e) => {
                console.log("error" + e);
              })
            }
            if (key.flag == "dep") {
              this.nextdirectory.child("dep").child(key.title).remove().then(() => {
                console.log("success dep")
                this.refreshname();
                toast.present();
              }).catch((e) => {
                console.log("error" + e);
              })
            }
            if (key.flag == "outlet") {
              this.nextdirectory.child("outlet").child(key.title).remove().then(() => {
                console.log("success")
                this.refreshname();
                toast.present();
              }).catch((e) => {
                console.log("error" + e);
              })
            }
            if (key.flag == "etc") {
              this.nextdirectory.child("etc").child(key.title).remove().then(() => {
                console.log("success")
                this.refreshname();
                toast.present();
              }).catch((e) => {
                console.log("error" + e);
              })
            }
          }
        }
      ]
    });
    alert.present();

    const toast = this.toastCtrl.create({
      message: '삭제되었습니다.',
      duration: 2000,
      position: 'top',
      cssClass: 'deletemodalToast'
    });
  }

  viewshoppinglist(a) {
    console.log(this.copyflag);
    console.log(a);
    console.log(a.key);
    console.log(a.flag);
    console.log(a.list);

    if (this.copyflag) {
      let alert = this.alertCtrl.create({
        title: '해당 목록에 덧붙이시겠습니까?',
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
              /*전체항목 기존복사*/
              if (this.selectedflagtocpy == 3) {
                console.log(newarray);
                var newarray = [];
                for (var b = 0; b < a.list.length; b++) {
                  newarray.push(a.list[b]);
                }
                for (var b = 0; b < this.tocopylist.length; b++) {
                  newarray.push(this.tocopylist[b]);
                }
                if (a.flag == "mart") {
                  var name = a.title;
                  this.firemain.child("users").child(this.id).child("mart").child(name).child(a.key).update({ flag: a.flag, key: a.key, list: newarray, time: a.time }).then(() => {
                    console.log(a.key);
                  })
                  this.refreshname();
                }

                if (a.flag == "dep") {
                  var name = a.title;
                  this.firemain.child("users").child(this.id).child("dep").child(name).child(a.key).update({ flag: a.flag, key: a.key, list: newarray, time: a.time }).then(() => {
                    console.log(a.key);
                  })
                  this.refreshname();
                }
                if (a.flag == "outlet") {
                  var name = a.title;
                  this.firemain.child("users").child(this.id).child("outlet").child(name).child(a.key).update({ flag: a.flag, key: a.key, list: newarray, time: a.time }).then(() => {
                    console.log(a.key);
                  })
                  this.refreshname();
                }
                if (a.flag == "etc") {
                  var name = a.title;
                  this.firemain.child("users").child(this.id).child("etc").child(name).child(a.key).update({ flag: a.flag, key: a.key, list: newarray, time: a.time }).then(() => {
                    console.log(a.key);
                  })
                  this.refreshname();
                }
                this.copyflag = false;
              }
              /*구입한 항목 기존복사*/
              else if (this.selectedflagtocpy == 2) {
                var newarray = [];

                for (var b = 0; b < a.list.length; b++) {
                  newarray.push(a.list[b]);
                }
                for (var i = 0; i < this.tocopylist.length; i++) {
                  if (this.tocopylist[i].checked == true) {
                    newarray.push(this.tocopylist[i]);
                    console.log(newarray);
                  }
                }
                console.log(newarray);
                a.list = [];
                for (var i = 0; i < newarray.length; i++) {
                  a.list.push(newarray[i])
                }
                console.log(newarray);

                if (a.flag == "mart") {
                  var name = a.title;
                  this.firemain.child("users").child(this.id).child("mart").child(name).child(a.key).update({ flag: a.flag, key: a.key, list: newarray, time: a.time }).then(() => {
                    console.log(a);
                  })
                  this.refreshname();
                }
                if (a.flag == "dep") {
                  var name = a.title;
                  this.firemain.child("users").child(this.id).child("dep").child(name).child(a.key).update({ flag: a.flag, key: a.key, list: newarray, time: a.time }).then(() => {
                    console.log(a);
                  })
                  this.refreshname();
                }
                if (a.flag == "outlet") {
                  var name = a.title;
                  this.firemain.child("users").child(this.id).child("outlet").child(name).child(a.key).update({ flag: a.flag, key: a.key, list: newarray, time: a.time }).then(() => {
                    console.log(a);
                  })
                  this.refreshname();
                }
                if (a.flag == "etc") {
                  var name = a.title;
                  this.firemain.child("users").child(this.id).child("etc").child(name).child(a.key).update({ flag: a.flag, key: a.key, list: newarray, time: a.time }).then(() => {

                    console.log(a);
                  })
                  this.refreshname();
                }
                this.copyflag = false;
              }
              /*구입하지 않은 항목 기존복사 */
              else if (this.selectedflagtocpy == 1) {
                var newarray = [];

                for (var b = 0; b < a.list.length; b++) {
                  newarray.push(a.list[b]);
                }
                for (var i = 0; i < this.tocopylist.length; i++) {
                  if (this.tocopylist[i].checked == false) {
                    newarray.push(this.tocopylist[i]);
                    console.log(newarray);
                  }
                }
                console.log(newarray);
                a.list = [];
                for (var i = 0; i < newarray.length; i++) {
                  a.list.push(newarray[i])
                }
                console.log(newarray);
                if (a.flag == "mart") {
                  var name = a.title;
                  this.firemain.child("users").child(this.id).child("mart").child(name).child(a.key).update({ flag: a.flag, key: a.key, list: newarray, time: a.time }).then(() => {
                    console.log(a);
                  })
                  this.refreshname();
                }

                if (a.flag == "dep") {
                  var name = a.title;
                  this.firemain.child("users").child(this.id).child("dep").child(name).child(a.key).update({ flag: a.flag, key: a.key, list: newarray, time: a.time }).then(() => {
                    console.log(a);
                  })
                  this.refreshname();
                }
                if (a.flag == "outlet") {
                  var name = a.title;
                  this.firemain.child("users").child(this.id).child("outlet").child(name).child(a.key).update({ flag: a.flag, key: a.key, list: newarray, time: a.time }).then(() => {
                    console.log(a);
                  })
                  this.refreshname();
                }
                if (a.flag == "etc") {
                  var name = a.title;
                  this.firemain.child("users").child(this.id).child("outlet").child(name).child(a.key).update({ flag: a.flag, key: a.key, list: newarray, time: a.time }).then(() => {
                    console.log(a);
                  })
                  this.refreshname();
                }
                this.copyflag = false;
              }
            }
          }
        ]
      });
      alert.present();
    }
    else {
      console.log(a);
      console.log(this.id);
      console.log(a.key);
      console.log(a.list);
      this.navCtrl.push(ViewshoppinglistPage, { "flag": a.flag, "obj": a, "id": this.id, "key": a.key }).then(() => {
        this.navCtrl.getActive().onDidDismiss(data => {
          this.refreshname();
        })
      })
      console.log(a.flag);

    }

  }
  select_sort() {
    if ($('.slt').val() == 'rel') {
      this.srct.url = 'https://msearch.shopping.naver.com/search/all.nhn?origQuery=' + this.srct.text + '&pagingIndex=1&pagingSize=40&viewType=list&sort=' + $("#slt").val() + '&frm=NVSHATC&query=' + this.srct.text;
    }
    if ($('.slt').val() == 'price_asc') {
      this.srct.url = 'https://msearch.shopping.naver.com/search/all?query=' + this.srct.text + '&pagingIndex=1&viewType=undefined&productSet=total&gender=all&age=999&sort=price_asc'
    }
    if ($('.slt').val() == 'price_dsc') {
      this.srct.url = 'https://msearch.shopping.naver.com/search/all?query=' + this.srct.text + '&pagingIndex=1&viewType=undefined&productSet=total&gender=all&age=999&sort=price_dsc'
    }
    if ($('.slt').val() == 'date') {
      this.srct.url = 'https://msearch.shopping.naver.com/search/all?query=' + this.srct.text + '&pagingIndex=1&viewType=undefined&productSet=total&gender=all&age=999&sort=date'
    }
    if ($('.slt').val() == 'review') {
      this.srct.url = 'https://msearch.shopping.naver.com/search/all?query=' + this.srct.text + '&pagingIndex=1&viewType=undefined&productSet=total&gender=all&age=999&sort=review'
    }
    console.log($('#slt').val());
    console.log(this.srct.text);
    console.log(this.srct.url);
    const browser = this.iab.create(this.srct.url, "_blank", "location=no,toolbar=no");

    //browser.executeScript({code:'document.cookie;'}).then((cookie)=>console.log(cookie))

    //browser.insertCSS(...);
    browser.on('loadstop').subscribe(event => {
      browser.insertCSS({ code: "body{color: red;" });
    });

    //browser.close();
  }


  setting() {
    this.navCtrl.push(SettingPage);
  }

  NoneAd() {
    let modal = this.modal.create(AdPage);
    modal.present();
  }

  appstore() {
    let modal = this.modal.create(RatePage);
    modal.present();
  }
  fabclicked(event, fab) {

    console.log(this.fabButtonOpened)
    this.fabButtonOpened = true;
    if (event.target.name == "rotate") {
      if (this.fab._listsActive) {
        this.fab.close();
      }
      this.fab = fab;
    }

  }
  closingfab(event) {

    this.fabButtonOpened = false;
    if (event.target.name != "rotate") {
      this.fab.close();
    }
  }
  /*목록명 변경*/
  changeName(key, fab) {
    fab.close;
    console.log(key);
    console.log(key.title);
    let alert = this.alertCtrl.create({
      title: '쇼핑 목록 명을 적어주세요',
      inputs: [
        {
          name: 'title',
          placeholder: 'title'
        }
      ],
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
            if (key.flag == "mart") {
              console.log(key.title);
              this.nextdirectory.child("mart").child(key.title).remove().then(() => {
                console.log("success");
              });
              this.firemain.child("users").child(this.id).child("mart").child(data.title).child(key.key).update(key).then(() => {
                console.log(key);
                console.log(key.key);
                key.title = data.title;
                const toast = this.toastCtrl.create({
                  message: '변경되었습니다.',
                  duration: 2000,
                  position: 'top',
                  cssClass: 'myToast'
                });
                toast.present();
              })
            }
            if (key.flag == "dep") {
              console.log(key.title);
              this.nextdirectory.child("dep").child(key.title).remove().then(() => {
                console.log("success");
              });
              this.firemain.child("users").child(this.id).child("dep").child(data.title).child(key.key).update(key).then(() => {
                console.log(key);
                console.log(key.key);
                key.title = data.title;
                const toast = this.toastCtrl.create({
                  message: '변경되었습니다.',
                  duration: 2000,
                  position: 'top',
                  cssClass: 'myToast'
                });
                toast.present();
              })
            }
            if (key.flag == "outlet") {
              console.log(key.title);
              this.nextdirectory.child("outlet").child(key.title).remove().then(() => {
                console.log("success");
              });
              this.firemain.child("users").child(this.id).child("outlet").child(data.title).child(key.key).update(key).then(() => {
                console.log(key);
                console.log(key.key);
                key.title = data.title;
                const toast = this.toastCtrl.create({
                  message: '변경되었습니다.',
                  duration: 2000,
                  position: 'top',
                  cssClass: 'myToast'
                });
                toast.present();
              })
            }
            if (key.flag == "etc") {
              console.log(key.title);
              this.nextdirectory.child("etc").child(key.title).remove().then(() => {
                console.log("success");
              });
              this.firemain.child("users").child(this.id).child("etc").child(data.title).child(key.key).update(key).then(() => {
                console.log(key);
                console.log(key.key);
                key.title = data.title;
                const toast = this.toastCtrl.create({
                  message: '변경되었습니다.',
                  duration: 2000,
                  position: 'top',
                  cssClass: 'myToast'
                });
                toast.present();
              })
            }
          }
        }
      ]
    });
    alert.present();
  }

  /*공유*/
  share(key, fab) {
    fab.close();
    var name = "";
    console.log(key.flag);
    console.log(key);
    for (var i in key.list) {
      console.log(key.list[i].name);
      name += "\n" + key.list[i].name;
      console.log(name);
    }
    console.log(name);

    var msg = "[백화점 마트 헛걸음 방지 앱\n '백마헛방'\n 쇼핑가기전엔 언제나\n '백마헛방']\n1)구입제목 : " + key.title + "\n2)작성일 : " + key.time + "\n3)리스트\n" + name;

    this.socialSharing.share(msg, null, null, null).then(() => {

      const toast = this.toastCtrl.create({
        message: '공유 완료되었습니다.',
        duration: 2000,
      });
      toast.present();
    })
  }

  /*전체 항목 복사*/
  newAllcopy(key) {
    var count = 1;
    if (key.flag == "mart") {
      var count = count;
      var a = key.title + "-복사본" + count;
      this.firemain.child("users").child(this.id).child("mart").child(a).child(key.key).update(key).then(() => {
        console.log(key);
      })
      this.refreshname();
      count++;
      console.log(count);
    }
    if (key.flag == "dep") {
      var a = key.title + "-복사본"
      this.firemain.child("users").child(this.id).child("dep").child(a).child(key.key).update(key).then(() => {
        console.log(key);
      })
      this.refreshname();
    }
    if (key.flag == "outlet") {
      var a = key.title + "-복사본"
      this.firemain.child("users").child(this.id).child("outlet").child(a).child(key.key).update(key).then(() => {
        console.log(key);
      })
      this.refreshname();
    }
    if (key.flag == "etc") {
      var a = key.title + "-복사본"
      this.firemain.child("users").child(this.id).child("etc").child(a).child(key.key).update(key).then(() => {
        console.log(key);
      })
      this.refreshname();
    }
  }

  /*구입한 항목 복사 */
  newHavecopy(key) {
    console.log(key);
    console.log(key.list);
    var checked = [];

    for (var i = 0; i < key.list.length; i++) {
      if (key.list[i].checked == true) {
        checked.push(key.list[i]);
        console.log(checked);
      }
    }
    console.log(checked);
    key.list = [];
    for (var i = 0; i < checked.length; i++) {
      key.list.push(checked[i])
    }

    if (key.flag == "mart") {
      var a = key.title + "-복사본";
      this.firemain.child("users").child(this.id).child("mart").child(a).child(key.key).update(key).then(() => {
        console.log(key);
      })
      this.refreshname();
    }

    if (key.flag == "dep") {
      var a = key.title + "-복사본"
      this.firemain.child("users").child(this.id).child("dep").child(a).child(key.key).update(key).then(() => {
        console.log(key);
      })
      this.refreshname();
    }
    if (key.flag == "outlet") {
      var a = key.title + "-복사본"
      this.firemain.child("users").child(this.id).child("outlet").child(a).child(key.key).update(key).then(() => {

        console.log(key);
      })
      this.refreshname();
    }
    if (key.flag == "etc") {
      var a = key.title + "-복사본"
      this.firemain.child("users").child(this.id).child("etc").child(a).child(key.key).update(key).then(() => {

        console.log(key);
      })
      this.refreshname();
    }
  }

  /*구입하지 않은 항목 복사 */
  newWillcopy(key) {
    console.log(key);
    console.log(key.list);
    var unchecked = [];
    for (var i = 0; i < key.list.length; i++) {
      if (key.list[i].checked == false) {
        unchecked.push(key.list[i]);
        console.log(unchecked);
      }
    }
    console.log(unchecked);
    key.list = [];
    for (var i = 0; i < unchecked.length; i++) {
      key.list.push(unchecked[i])
    }

    if (key.flag == "mart") {
      var a = key.title + "-복사본";

      this.firemain.child("users").child(this.id).child("mart").child(a).child(key.key).update(key).then(() => {
        console.log(key);
      })
      this.refreshname();
    }

    if (key.flag == "dep") {
      var a = key.title + "-복사본"
      this.firemain.child("users").child(this.id).child("dep").child(a).child(key.key).update(key).then(() => {
        console.log(key);
      })
      this.refreshname();
    }
    if (key.flag == "outlet") {
      var a = key.title + "-복사본"
      this.firemain.child("users").child(this.id).child("outlet").child(a).child(key.key).update(key).then(() => {

        console.log(key);
      })
      this.refreshname();
    }
    if (key.flag == "etc") {
      var a = key.title + "-복사본"
      this.firemain.child("users").child(this.id).child("etc").child(a).child(key.key).update(key).then(() => {

        console.log(key);
      })
      this.refreshname();
    }
  }

  oldAllcopy(key, flag) {
    this.selectedflagtocpy = flag;
    console.log("copy old all")
    this.copyflag = true;
  }

  oldHavecopy(key, flag) {
    this.selectedflagtocpy = flag;
    console.log("copy old old")
    this.copyflag = true;
  }

  oldWillcopy(key, flag) {
    this.selectedflagtocpy = flag;
    console.log("copy old will")
    this.copyflag = true;
  }

  openModal(key, fab) {
    fab.close();
    console.log(key);
    this.tocopylist = key.list;
    this.tocopy = key;
    console.log(this.tocopylist);
    let modal = this.modal.create(CopymodalPage, null, {
      cssClass: "modalcopy"
    });
    modal.onDidDismiss(data => {
      console.log(key);
      console.log(key.list);
      if (data.flag == "cancel") {
        const toast = this.toastCtrl.create({
          message: '취소되었습니다.',
          duration: 2000,
          position: 'top',
          cssClass: 'myToast'
        });
        toast.present();
      }
      if (data.flag == "new") {
        if (data.value == "1") {
          console.log(data.value);
          this.newWillcopy(key);
        }
        else if (data.value == "2") {
          console.log(data.value);
          this.newHavecopy(key);
        }
        else if (data.value == "3") {
          console.log(data.value);
          this.newAllcopy(key);
        }
      }
      else if (data.flag == "old") {
        if (data.value == "1") {
          console.log(data.value);
          this.oldWillcopy(key, data.value);
        }
        else if (data.value == "2") {
          console.log(data.value);
          this.oldHavecopy(key, data.value);
        }
        else if (data.value == "3") {
          console.log(data.value);
          this.oldAllcopy(key, data.value);
        }
      }
    })
    modal.present();
  }

  OneSignalInstall() {
    console.log("start Signal")
    this.oneSignal.startInit('a6cc4273-cded-4f39-a0a9-00c2086c1a08', '552511846926');
    // this.oneSignal.clearOneSignalNotifications();
    var iosSettings = {
      "kOSSettingsKeyAutoPrompt": true,
      "kOSSettingsKeyInAppLaunchURL": true
    };
    this.oneSignal.iOSSettings(iosSettings);
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    //알림을 받았을때에 아래 함수로
    this.oneSignal.handleNotificationReceived().subscribe((data) => {

      // var hour=data.payload.additionalData.hour;
      // var min=data.payload.additionalData.minute;
    });

    this.oneSignal.handleNotificationOpened().subscribe(data => {
      console.log("data Confirm");
      console.log(data);
      console.log(data.notification.payload.additionalData.hour);
      console.log("opened");
    });

    this.oneSignal.getIds().then(data => {
      console.log("get id success" + data.userId)
      console.log(this.id)
      this.firemain.child("users").child(this.id).child("setting").update({ "deviceId": data.userId });
      let sendData = [];
      localStorage.setItem("tokenvalue", data.userId);
      //디비에 토큰값을 넣음
    }).catch((e) => {
      window.alert("onesignal error" + e);
    })
    this.oneSignal.endInit();
  }


  constructor(public fab: FabContainer, public modal: ModalController, private socialSharing: SocialSharing, private iab: InAppBrowser, public uniqueDeviceID: UniqueDeviceID,
    public alertCtrl: AlertController, public callnumber: CallNumber, public keyboard:Keyboard,
    public admobFree: AdMobFree, public navCtrl: NavController,
    public platform: Platform, public navParams: NavParams,
    public oneSignal: OneSignal, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
    
    $('#fabb').click(function (event) {
      event.stopPropagation();
    });
    this.uniqueDeviceID.get()
        .then((uuid: any) => {console.log("get uniquedi well");
         this.id = uuid; console.log(uuid);
         localStorage.setItem("id",this.id);
         this.init(); })
        .catch((error: any) => {
          console.log("error in uniquedevice")
          console.log(error)


          this.id = "00000000-0000-0000-39d1-f26acbf711b3";
          this.init();
        });
        
    setTimeout(() => {
      console.log("settimeout odne")
  
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
    
        this.OneSignalInstall();
    }, 1000)



  }

  init() {
    this.today = [];
    this.week = [];
    this.dayoffarray = [];
    console.log("first id is : " + this.id);
    this.nextdirectory = this.firemain.child("users").child(this.id);
    this.presentLoadingDefault();
    this.fabButtonOpened = false;
    this.refreshname();
    this.favorite();
    this.today.push("오늘", "", "", "", "", "", "");
    console.log(this.today);
    this.newDate();

  }

}