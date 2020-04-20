import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { CallNumber } from '@ionic-native/call-number';
import { AdMobFreeBannerConfig, AdMobFree } from '@ionic-native/admob-free';

/**
 * Generated class for the MartinfoviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-martinfoview',
  templateUrl: 'martinfoview.html',
})
export class MartinfoviewPage {
  id: any ;
  firemain = firebase.database().ref();
  martinfo = [];
  today = new Date();
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  currentDate: any;
  currentMonth: any;
  currentYear: any;
  date = new Date();
  logo = [];
  marttel: any;
  weekNo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, public admobFree: AdMobFree, public alertCtrl: AlertController) {
    this.martinfo = this.navParams.get("martinfo");
    this.id=this.navParams.get("id");
    console.log(this.martinfo);
    for (var i in this.martinfo) {
      if (i == "tel") {
        console.log(this.martinfo[i]);
      }
    }
    this.month = this.date.getMonth() + 1;
    this.getDaysOfMonth();
    this.firemain.child("users").child(this.id).once("value", (sn) => {
      for (var a in sn.val()) {
        console.log(a);
        console.log(sn.val()[a]);
        if (a == "favorite") {
          console.log(sn.val()[a]);
          for (var b in sn.val()[a]) {
            if (b == "lotte") { this.logo.push({ "image": "./assets/imgs/009.png", "name": "롯데마트", "flag": "lotte" }); }
            if (b == "emart") { this.logo.push({ "image": ".assets/imgs/010.png", "name": "이마트", "flag": "emart" }); }
            if (b == "homeplus") { this.logo.push({ "image": "./assets/imgs/011.png", "name": "홈플러스", "flag": "homeplus" }); }
            if (b == "costco") { this.logo.push({ "image": "./assets/imgs/012.png", "name": "코스트코", "flag": "costco" }); }
            if (b == "traders") { this.logo.push({ "image": "./assets/imgs/013.png", "name": "이마트 트레이더스", "flag": "traders" }); }
            if (b == "lottedep") { this.logo.push({ "image": "./assets/imgs/020.png", "name": "롯데백화점", "flag": "lottedep" }); }
            if (b == "sinsaegae") { this.logo.push({ "image": "./assets/imgs/021.png", "name": "신세계백화점", "flag": "sinsaegae" }); }
            if (b == "hyundai") { this.logo.push({ "image": "./assets/imgs/022.png", "name": "현대백화점", "flag": "hyundai" }); }
            if (b == "lotteoutlet") { this.logo.push({ "image": "./assets/imgs/023.png", "name": "롯데아울렛", "flag": "lotteoutlet" }); }
            if (b == "emart24") { this.logo.push({ "image": "./assets/imgs/014.png", "name": "이마트 노브랜드", "flag": "nobrand" }); }
            if (b == "emarteveryday") { this.logo.push({ "image": "./assets/imgs/015.png", "name": "이마트 에브리데이", "flag": "everyday" }); }
            if (b == "topmart") { this.logo.push({ "image": "./assets/imgs/016.png", "name": "탑마트", "flag": "topmart" }); }
            if (b == "gs") { this.logo.push({ "image": "./assets/imgs/017.png", "name": "GS수퍼마켓", "flag": "gs" }); }
            if (b == "express") { this.logo.push({ "image": "./assets/imgs/018.png", "name": "홈플러스 익스프레스", "flag": "express" }); }
            if (b == "bigmartket") { this.logo.push({ "image": "./assets/imgs/019.png", "name": "롯데 빅마켓", "flag": "vicmarket" }); }
          }
        }
      }
    })
    this.dayoff();
    console.log(this.offArr);
    console.log(this.daysInThisMonth);
    for (var j = 0; j < this.daysInThisMonth.length; j++) {
      for (var k = 0; k < this.offArr.length; k++) {
        if (this.daysInThisMonth[j] == this.offArr[k]) {
          this.daysInThisMonth[j] = "i" + this.daysInThisMonth[j];
        }
      }
    }
    console.log(this.daysInThisMonth);


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
  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.date.getMonth() + 1;
    this.currentYear = this.date.getFullYear();
    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }
    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    for (var j = 0; j < thisNumOfDays; j++) {
      this.daysInThisMonth.push(j + 1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
    for (var k = 0; k < (6 - lastDayThisMonth); k++) {
      this.daysInNextMonth.push(k + 1);
    }
    var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
    if (totalDays < 36) {
      for (var l = (7 - lastDayThisMonth); l < ((7 - lastDayThisMonth)); l++) {
        console.log(lastDayThisMonth);
        console.log(l);
        this.daysInNextMonth.push(l);
        console.log(this.daysInNextMonth);
      }
    }
  }

  calling() {
    console.log("aaa");
    console.log(this.martinfo);
    for (var i in this.martinfo) {
      if (i == "tel") {
        console.log(this.martinfo[i]);
        this.marttel = this.martinfo[i];
      }
    }
    let alert = this.alertCtrl.create({
      title: this.marttel,
      cssClass: 'deletemodalToast',
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '통화',
          handler: data => {
            setTimeout(() => {
              this.callNumber.callNumber(this.marttel, false)
                .then(res => console.log('Launched dialer!', res))
                .catch(err => {
                  console.log('Error launching dialer', err)
                  this.callNumber.callNumber(this.marttel, false)
                    .then(res => console.log('Launched dialer!', res)).catch((e) => {
                      console.log(e);
                    })
                })
            }, 1000)
          }
        }
      ]
    });
    alert.present();
  }

  map() {
    var martaddr = "";
    // window.open("http://naver.com", '_blank');
    for (var i in this.martinfo) {
      if (i == "name") {
        console.log(this.martinfo[i]);
        martaddr = this.martinfo[i];
        window.open("https://m.map.naver.com/search2/search.nhn?query="+martaddr+"&sm=hty&style=v5#/map")
      }
    }
    console.log("map");
    console.log("hhhh");
  }

  calendar = new Date();
  day = this.calendar.getDate();
  year = this.calendar.getFullYear();
  month = this.calendar.getMonth();
  firstDate = new Date(this.year, this.month, 1).getDay();//첫날의 요일
  lastDate = new Date(this.year, this.month + 1, 0);//마지막 날의 요일
  offday: any;
  dateArr = [];
  weekArr = [];
  dayoffArr = [];
  off: any;

  offweek: any;
  offdayofweek: any;


  weekCal: any;
  dayofweekCal = 0;
  offArr = [];
  truecheck(day1) {
    var day = day1 + "";
    if (day.indexOf("i") > -1) {
      return -1;
    } else {
      return 0;
    }

  }
  dayoff() {
    var dayofWeek = ['일', '월', '화', '수', '목', '금', '토'];
    for (var i in this.martinfo) {
      if (i == "vacation") {
        console.log(this.martinfo[i]);
        if (this.martinfo[i].indexOf("첫째") > -1 && this.martinfo[i].indexOf("일요일") > -1 || this.martinfo[i].indexOf("1") > -1 && this.martinfo[i].indexOf("일요일") > -1) { this.offday = "10"; console.log("첫째주 일요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("첫째") > -1 && this.martinfo[i].indexOf("월요일") > -1 || this.martinfo[i].indexOf("1") > -1 && this.martinfo[i].indexOf("월요일") > -1) { this.offday = "11"; console.log("첫째주 월요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("첫째") > -1 && this.martinfo[i].indexOf("화요일") > -1 || this.martinfo[i].indexOf("1") > -1 && this.martinfo[i].indexOf("화요일") > -1) { this.offday = "12"; console.log("첫째주 화요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("첫째") > -1 && this.martinfo[i].indexOf("수요일") > -1 || this.martinfo[i].indexOf("1") > -1 && this.martinfo[i].indexOf("수요일") > -1) { this.offday = "13"; console.log("첫째주 수요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("첫째") > -1 && this.martinfo[i].indexOf("목요일") > -1 || this.martinfo[i].indexOf("1") > -1 && this.martinfo[i].indexOf("목요일") > -1) { this.offday = "14"; console.log("첫째주 목요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("첫째") > -1 && this.martinfo[i].indexOf("금요일") > -1 || this.martinfo[i].indexOf("1") > -1 && this.martinfo[i].indexOf("금요일") > -1) { this.offday = "15"; console.log("첫째주 금요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("첫째") > -1 && this.martinfo[i].indexOf("토요일") > -1 || this.martinfo[i].indexOf("1") > -1 && this.martinfo[i].indexOf("토요일") > -1) { this.offday = "16"; console.log("첫째주 토요일 " + this.offday); this.dayoffArr.push(this.offday) }

        if (this.martinfo[i].indexOf("둘째") > -1 && this.martinfo[i].indexOf("일요일") > -1 || this.martinfo[i].indexOf("2") > -1 && this.martinfo[i].indexOf("일요일") > -1) { this.offday = "20"; console.log("둘째주 일요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("둘째") > -1 && this.martinfo[i].indexOf("월요일") > -1 || this.martinfo[i].indexOf("2") > -1 && this.martinfo[i].indexOf("월요일") > -1) { this.offday = "21"; console.log("둘째주 월요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("둘째") > -1 && this.martinfo[i].indexOf("화요일") > -1 || this.martinfo[i].indexOf("2") > -1 && this.martinfo[i].indexOf("화요일") > -1) { this.offday = "22"; console.log("둘째주 화요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("둘째") > -1 && this.martinfo[i].indexOf("수요일") > -1 || this.martinfo[i].indexOf("2") > -1 && this.martinfo[i].indexOf("수요일") > -1) { this.offday = "23"; console.log("둘째주 수요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("둘째") > -1 && this.martinfo[i].indexOf("목요일") > -1 || this.martinfo[i].indexOf("2") > -1 && this.martinfo[i].indexOf("목요일") > -1) { this.offday = "24"; console.log("둘째주 목요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("둘째") > -1 && this.martinfo[i].indexOf("금요일") > -1 || this.martinfo[i].indexOf("2") > -1 && this.martinfo[i].indexOf("금요일") > -1) { this.offday = "25"; console.log("둘째주 금요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("둘째") > -1 && this.martinfo[i].indexOf("토요일") > -1 || this.martinfo[i].indexOf("2") > -1 && this.martinfo[i].indexOf("토요일") > -1) { this.offday = "26"; console.log("둘째주 토요일 " + this.offday); this.dayoffArr.push(this.offday) }

        if (this.martinfo[i].indexOf("셋째") > -1 && this.martinfo[i].indexOf("일요일") > -1 || this.martinfo[i].indexOf("3") > -1 && this.martinfo[i].indexOf("일요일") > -1) { this.offday = "30"; console.log("셋째주 일요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("셋째") > -1 && this.martinfo[i].indexOf("월요일") > -1 || this.martinfo[i].indexOf("3") > -1 && this.martinfo[i].indexOf("월요일") > -1) { this.offday = "31"; console.log("셋째주 월요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("셋째") > -1 && this.martinfo[i].indexOf("화요일") > -1 || this.martinfo[i].indexOf("3") > -1 && this.martinfo[i].indexOf("화요일") > -1) { this.offday = "32"; console.log("셋째주 화요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("셋째") > -1 && this.martinfo[i].indexOf("수요일") > -1 || this.martinfo[i].indexOf("3") > -1 && this.martinfo[i].indexOf("수요일") > -1) { this.offday = "33"; console.log("셋째주 수요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("셋째") > -1 && this.martinfo[i].indexOf("목요일") > -1 || this.martinfo[i].indexOf("3") > -1 && this.martinfo[i].indexOf("목요일") > -1) { this.offday = "34"; console.log("셋째주 목요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("셋째") > -1 && this.martinfo[i].indexOf("금요일") > -1 || this.martinfo[i].indexOf("3") > -1 && this.martinfo[i].indexOf("금요일") > -1) { this.offday = "35"; console.log("셋째주 금요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("셋째") > -1 && this.martinfo[i].indexOf("토요일") > -1 || this.martinfo[i].indexOf("3") > -1 && this.martinfo[i].indexOf("토요일") > -1) { this.offday = "36"; console.log("셋째주 토요일 " + this.offday); this.dayoffArr.push(this.offday) }

        if (this.martinfo[i].indexOf("넷째") > -1 && this.martinfo[i].indexOf("일요일") > -1 || this.martinfo[i].indexOf("4") > -1 && this.martinfo[i].indexOf("일요일") > -1) { this.offday = "40"; console.log("넷째주 일요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("넷째") > -1 && this.martinfo[i].indexOf("월요일") > -1 || this.martinfo[i].indexOf("4") > -1 && this.martinfo[i].indexOf("월요일") > -1) { this.offday = "41"; console.log("넷째주 월요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("넷째") > -1 && this.martinfo[i].indexOf("화요일") > -1 || this.martinfo[i].indexOf("4") > -1 && this.martinfo[i].indexOf("화요일") > -1) { this.offday = "42"; console.log("넷째주 화요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("넷째") > -1 && this.martinfo[i].indexOf("수요일") > -1 || this.martinfo[i].indexOf("4") > -1 && this.martinfo[i].indexOf("수요일") > -1) { this.offday = "43"; console.log("넷째주 수요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("넷째") > -1 && this.martinfo[i].indexOf("목요일") > -1 || this.martinfo[i].indexOf("4") > -1 && this.martinfo[i].indexOf("목요일") > -1) { this.offday = "44"; console.log("넷째주 목요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("넷째") > -1 && this.martinfo[i].indexOf("금요일") > -1 || this.martinfo[i].indexOf("4") > -1 && this.martinfo[i].indexOf("금요일") > -1) { this.offday = "45"; console.log("넷째주 금요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("넷째") > -1 && this.martinfo[i].indexOf("토요일") > -1 || this.martinfo[i].indexOf("4") > -1 && this.martinfo[i].indexOf("토요일") > -1) { this.offday = "46"; console.log("넷째주 토요일 " + this.offday); this.dayoffArr.push(this.offday) }

        if (this.martinfo[i].indexOf("다섯째") > -1 && this.martinfo[i].indexOf("일요일") > -1 || this.martinfo[i].indexOf("5") > -1 && this.martinfo[i].indexOf("일요일") > -1) { this.offday = "50"; console.log("다섯째주 일요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("다섯째") > -1 && this.martinfo[i].indexOf("일요일") > -1 || this.martinfo[i].indexOf("5") > -1 && this.martinfo[i].indexOf("월요일") > -1) { this.offday = "51"; console.log("다섯째주 월요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("다섯째") > -1 && this.martinfo[i].indexOf("일요일") > -1 || this.martinfo[i].indexOf("5") > -1 && this.martinfo[i].indexOf("화요일") > -1) { this.offday = "52"; console.log("다섯째주 화요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("다섯째") > -1 && this.martinfo[i].indexOf("일요일") > -1 || this.martinfo[i].indexOf("5") > -1 && this.martinfo[i].indexOf("수요일") > -1) { this.offday = "53"; console.log("다섯째주 수요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("다섯째") > -1 && this.martinfo[i].indexOf("일요일") > -1 || this.martinfo[i].indexOf("5") > -1 && this.martinfo[i].indexOf("목요일") > -1) { this.offday = "54"; console.log("다섯째주 목요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("다섯째") > -1 && this.martinfo[i].indexOf("일요일") > -1 || this.martinfo[i].indexOf("5") > -1 && this.martinfo[i].indexOf("금요일") > -1) { this.offday = "55"; console.log("다섯째주 금요일 " + this.offday); this.dayoffArr.push(this.offday) }
        if (this.martinfo[i].indexOf("다섯째") > -1 && this.martinfo[i].indexOf("일요일") > -1 || this.martinfo[i].indexOf("5") > -1 && this.martinfo[i].indexOf("토요일") > -1) { this.offday = "56"; console.log("다섯째주 토요일 " + this.offday); this.dayoffArr.push(this.offday) }
      }
    }
    console.log(this.dayoffArr);
    console.log(this.day);

    var count = 0;
    console.log(this.lastDate.getDate());
    for (var m = 1; m <= this.lastDate.getDate(); m++) {
      var date = this.calendar.getDate() + (m - this.calendar.getDate());
      this.dateArr.push(date);
      var week = Math.ceil((date) / 7);
      this.weekArr.push(week);
      if (count > 6) {// 0:일, 1:월, 2:화, 3:수, 4:목, 5:금, 6:토
        count = 0;
      }
      console.log(date + "일은 " + week + "주 " + dayofWeek[count] + "요일");
      // console.log(week+""+count);
      this.off = week + "" + count;
      console.log(this.off)
      for (var cnt = 0; cnt < this.dayoffArr.length; cnt++) {
        if (this.off.indexOf(this.dayoffArr[cnt]) > -1) {
          console.log(this.off + "=" + this.dayoffArr[cnt]);
          this.offweek = this.dayoffArr[cnt].substr(0, 1);
          this.offdayofweek = this.dayoffArr[cnt].substr(1, 2);

          console.log(this.offweek);
          console.log(this.offdayofweek);
          if (this.offweek == "1") { this.weekCal = 1; if (this.firstDate == 0) { this.dayofweekCal = 0 }; }
          if (this.offweek == "2") {
            this.weekCal = 2;
            console.log(this.firstDate);
            if (this.firstDate == 0) {
              if (this.offdayofweek == 0) { this.dayofweekCal = 8; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal = 9; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal = 10; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal = 11; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal = 12; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal = 13; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal = 14; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 1) {
              if (this.offdayofweek == 0) { this.dayofweekCal = 7; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal = 8; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal = 9; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal = 10; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal = 11; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal = 12; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal = 13; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 2) {
              if (this.offdayofweek == 0) { this.dayofweekCal = 6; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal = 7; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal = 8; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal = 9; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal = 10; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal = 11; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal = 12; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 3) {
              if (this.offdayofweek == 0) { this.dayofweekCal = 5; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal = 6; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal = 7; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal = 8; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal = 9; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal = 10; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal = 11; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 4) {
              if (this.offdayofweek == 0) { this.dayofweekCal = 4; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal = 5; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal = 6; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal = 7; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal = 8; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal = 9; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal = 10; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 5) {
              if (this.offdayofweek == 0) { this.dayofweekCal = 3; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal = 4; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal = 5; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal = 6; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal = 7; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal = 8; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal = 9; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 6) {
              if (this.offdayofweek == 0) { this.dayofweekCal = 2; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal = 3; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal = 4; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal = 5; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal = 6; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal = 7; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal = 8; this.offArr.push(this.dayofweekCal); }
            };
          }
          if (this.offweek == "3") {
            this.weekCal = 3;
            if (this.firstDate == 0) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  15; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  16; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  17; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  18; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  19; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  20; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  21; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 1) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  14; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  15; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  16; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  17; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  18; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  19; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  20; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 2) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  13; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  14; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  15; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  16; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  17; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  18; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  19; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 3) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  12; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  13; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  14; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  15; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  16; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  17; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  18; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 4) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  11; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  12; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  13; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  14; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  15; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  16; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  17; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 5) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  10; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  11; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  12; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  13; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  14; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  15; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  16; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 6) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  9; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  10; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  11; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  12; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  13; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  14; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  15; this.offArr.push(this.dayofweekCal); }
            };
          }
          if (this.offweek == "4") {
            this.weekCal = 4;
            if (this.firstDate == 0) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  22; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  23; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  24; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  25; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  26; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  27; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  28; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 1) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  21; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  22; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  23; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  24; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  25; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  26; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  27; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 2) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  20; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  21; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  22; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  23; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  24; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  25; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  26; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 3) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  19; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  20; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  21; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  22; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  23; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  24; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  25; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 4) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  18; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  19; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  20; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  21; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  22; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  23; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  24; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 5) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  17; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  18; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  19; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  20; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  21; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  22; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  23; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 6) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  16; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  17; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  18; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  19; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  20; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  21; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  22; this.offArr.push(this.dayofweekCal); }
            };
          }
          if (this.offweek == "5") {
            this.weekCal = 5;
            if (this.firstDate == 0) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  29; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  30; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  31; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 1) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  28; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  29; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  30; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  31; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 2) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  27; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  28; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  29; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  30; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  31; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 3) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  26; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  27; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  28; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  29; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  30; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  31; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 4) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  25; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  26; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  27; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  28; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  29; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  30; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  31; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 5) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  24; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  25; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  26; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  27; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  28; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  29; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  30; this.offArr.push(this.dayofweekCal); }
            };
            if (this.firstDate == 6) {
              if (this.offdayofweek == 0) { this.dayofweekCal =  23; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 1) { this.dayofweekCal =  24; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 2) { this.dayofweekCal =  25; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 3) { this.dayofweekCal =  26; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 4) { this.dayofweekCal =  27; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 5) { this.dayofweekCal =  28; this.offArr.push(this.dayofweekCal); }
              if (this.offdayofweek == 6) { this.dayofweekCal =  29; this.offArr.push(this.dayofweekCal); }
            };
          }
          console.log("휴무일은 " + this.weekCal + "주 " + dayofWeek[this.offdayofweek] + "요일");
          console.log("휴무일은 " + this.weekCal + "주 " + this.dayofweekCal + "일");
          console.log(this.offArr);
        }
      }
      count++;
    }
  }

}