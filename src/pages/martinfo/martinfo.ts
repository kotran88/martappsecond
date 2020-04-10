import { Component } from '@angular/core';
import { NavController,App,Platform,ViewController, NavParams, ToastController, ModalController } from 'ionic-angular';
import firebase from 'firebase';
import * as $ from 'jquery';
import { first } from 'rxjs/operators';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdPage } from '../ad/ad';
import { RatePage } from '../rate/rate';
import { MartinfoviewPage } from '../martinfoview/martinfoview';
import { FavoritemodalPage } from '../favoritemodal/favoritemodal';
import { HomePage } from '../home/home';

/**
 * Generated class for the MartinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-martinfo',
  templateUrl: 'martinfo.html',
})
export class MartinfoPage {
  area: any;
  mart: any;
  img: any;
  name: any;
  day = new Date();
  year: any;
  month: any;
  // date: any;
  dayOfweek: any;
  martArray = [];
  firemain = firebase.database().ref();
  week = [];
  dayweek = [];
  dayoff = [];
  dayy: any;
  today: any;
  todayy = [];
  userId:any;
  vacation: any;
  vacationArr = [];
  userarr = [];
  fav : any;


  constructor(public app:App,public platform:Platform,public view:ViewController,public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    private socialSharing: SocialSharing, public modal: ModalController) {
    this.mart = this.navParams.get("mart");
    this.area = this.navParams.get("area");
    this.userId=this.navParams.get("id");
    console.log("user id is :::::"+this.userId);
    this.martfunc();
    this.todayy.push("오늘", "", "", "", "", "", "");

    console.log(this.mart);
    console.log(this.area);
    this.year = this.day.getFullYear();
    this.month = this.day.getMonth() + 1;
    // this.date = this.day.getDate();
    this.dayOfweek = this.day.getDay();
    // this.theDate();
    console.log(this.martArray);
    this.firemain.child("users").child(this.userId).child("favorite").once("value", (sn) => {
      console.log(sn.val());
      for (var i in sn.val()) {
        for (var j in sn.val()[i]) {
          // this.fav = sn.val[i][j].favorite;
          console.log(sn.val()[i][j].favorite);
          this.favoriteList.push(sn.val()[i][j]);
          // console.log(this.fav);
          for(var mart in this.martArray){
            if(sn.val()[i][j].name == this.martArray[mart].name){
              if(sn.val()[i][j].favorite == true){
                this.martArray[mart].favorite = true;
                console.log("success");
              }
            }
          }
        }
      }
      
    });
    // for(var fav in this.favoriteList){
    //   console.log(this.favoriteList);
    //   for(var mart in this.martArray){
    //     console.log("mart");
    //     if(this.favoriteList[fav].name == this.martArray[mart].name){
    //       console.log(this.favoriteList[fav].name);
    //       console.log(this.martArray[mart].name);
    //       if(this.favoriteList[fav].favorite == true){
    //         this.martArray[mart].favorite = true;
    //       }
    //     }
    //   }
    // }
    this.favchange();
    console.log(this.favoriteList);
    console.log(this.martArray);
    this.newDate();
   

  }

  goback(){
    this.navCtrl.push(HomePage);
  }

  favchange() {
    for (var a in this.favoriteList) {
      console.log("1111111111");

      for (var b in this.martArray) {
        console.log("22222222");

        if (this.favoriteList[a].addr == this.martArray[b].addr) {
          console.log("33333333");
        }
      }
    }
  }

  martview(martinfo) {
    console.log(martinfo);
    this.navCtrl.push(MartinfoviewPage, { "martinfo": martinfo,"id":this.userId });
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

  currentMonth: any;
  currentYear: any;
  currentDate: any;
  date = new Date();
  weekNo: any;
  thismonth = [];
  offdayyear = [];
  offdayname: any;
  cnt: any


  newfunction(name) {
    console.log(name);
    console.log(this.favoriteList);
    console.log(this.area);
    this.firemain.child("mart").once("value", (sn) => {
      for (var a in sn.val()) {
        if (a == name) {
          if (this.area == "seoul") {
            var counting = 0;
            for (var b in sn.val()[a]) {
              if (sn.val()[a][b].addr.indexOf("서울") != -1 && sn.val()[a][b].addr.indexOf("서울대학로") == -1) {
                counting++;
                this.martArray.push(sn.val()[a][b]);
                console.log(this.martArray);
                this.vacationArr.push(sn.val()[a][b].vacation);
                this.vacation = sn.val()[a][b].vacation;
                this.vacationFunc(this.week, sn.val()[a][b], counting);
              }
            }
          }

          if (this.area == "gyeonggi") {
            var counting = 0;
            for (var b in sn.val()[a]) {
              this.vacation = sn.val()[a][b].vacation;
              if (sn.val()[a][b].addr.indexOf("경기") != -1) {
                counting++;
                this.martArray.push(sn.val()[a][b]);
                this.vacationArr.push(sn.val()[a][b].vacation);
                this.vacation = sn.val()[a][b].vacation;
                this.vacationFunc(this.week, sn.val()[a][b], counting);
              }
            }
          }
          if (this.area == "incheon") {
            var counting = 0;
            for (var b in sn.val()[a]) {
              this.vacation = sn.val()[a][b].vacation;
              if (sn.val()[a][b].addr.indexOf("인천") != -1) {
                counting++;
                this.martArray.push(sn.val()[a][b]);
                this.vacationArr.push(sn.val()[a][b].vacation);
                this.vacation = sn.val()[a][b].vacation;
                this.vacationFunc(this.week, sn.val()[a][b], counting);
              }
            }
          }
          if (this.area == "gangwon") {
            var counting = 0;
            for (var b in sn.val()[a]) {
              this.vacation = sn.val()[a][b].vacation;
              if (sn.val()[a][b].addr.indexOf("강원") != -1) {
                counting++;
                this.martArray.push(sn.val()[a][b]);
                this.vacationArr.push(sn.val()[a][b].vacation);
                this.vacation = sn.val()[a][b].vacation;
                this.vacationFunc(this.week, sn.val()[a][b], counting);
              }
            }
          }
          if (this.area == "chungbuk") {
            var counting = 0;
            for (var b in sn.val()[a]) {
              this.vacation = sn.val()[a][b].vacation;
              if (sn.val()[a][b].addr.indexOf("충북") != -1) {
                counting++;
                this.martArray.push(sn.val()[a][b]);
                this.vacationArr.push(sn.val()[a][b].vacation);
                this.vacation = sn.val()[a][b].vacation;
                this.vacationFunc(this.week, sn.val()[a][b], counting);
              }
            }
          }
          if (this.area == "chungnam") {
            var counting = 0;
            for (var b in sn.val()[a]) {
              this.vacation = sn.val()[a][b].vacation;
              if (sn.val()[a][b].addr.indexOf("충남") != -1) {
                counting++;
                this.martArray.push(sn.val()[a][b]);
                this.vacationArr.push(sn.val()[a][b].vacation);
                this.vacation = sn.val()[a][b].vacation;
                this.vacationFunc(this.week, sn.val()[a][b], counting);
              }
            }
          }
          if (this.area == "jeonbuk") {
            var counting = 0;
            for (var b in sn.val()[a]) {
              this.vacation = sn.val()[a][b].vacation;
              if (sn.val()[a][b].addr.indexOf("전북") != -1) {
                counting++;
                this.martArray.push(sn.val()[a][b]);
                this.vacationArr.push(sn.val()[a][b].vacation);
                this.vacation = sn.val()[a][b].vacation;
                this.vacationFunc(this.week, sn.val()[a][b], counting);
              }
            }
          }
          if (this.area == "jeonnam") {
            var counting = 0;

            for (var b in sn.val()[a]) {
              this.vacation = sn.val()[a][b].vacation;
              if (sn.val()[a][b].addr.indexOf("전남") != -1) {
                counting++;
                this.martArray.push(sn.val()[a][b]);
                this.vacationArr.push(sn.val()[a][b].vacation);
                this.vacation = sn.val()[a][b].vacation;
                this.vacationFunc(this.week, sn.val()[a][b], counting);
              }
            }
          }
          if (this.area == "gwangju") {
            var counting = 0;

            for (var b in sn.val()[a]) {
              this.vacation = sn.val()[a][b].vacation;
              if (sn.val()[a][b].addr.indexOf("광주") != -1) {
                counting++;
                this.martArray.push(sn.val()[a][b]);
                this.vacationArr.push(sn.val()[a][b].vacation);
                this.vacation = sn.val()[a][b].vacation;
                this.vacationFunc(this.week, sn.val()[a][b], counting);
              }
            }
          }
          if (this.area == "daejeon") {
            var counting = 0;

            for (var b in sn.val()[a]) {
              this.vacation = sn.val()[a][b].vacation;
              if (sn.val()[a][b].addr.indexOf("대전") != -1) {
                counting++;
                this.martArray.push(sn.val()[a][b]);
                this.vacationArr.push(sn.val()[a][b].vacation);
                this.vacation = sn.val()[a][b].vacation;
                this.vacationFunc(this.week, sn.val()[a][b], counting);
              }
            }
          }
          if (this.area == "daegu") {
            var counting = 0;

            for (var b in sn.val()[a]) {
              this.vacation = sn.val()[a][b].vacation;
              if (sn.val()[a][b].addr.indexOf("대구") != -1 && sn.val()[a][b].addr.indexOf("해운대구") == -1) {
                counting++;
                this.martArray.push(sn.val()[a][b]);
                this.vacationArr.push(sn.val()[a][b].vacation);
                this.vacation = sn.val()[a][b].vacation;
                this.vacationFunc(this.week, sn.val()[a][b], counting);
              }
            }
          }
          if (this.area == "gyeongbuk") {
            var counting = 0;

            for (var b in sn.val()[a]) {
              this.vacation = sn.val()[a][b].vacation;
              if (sn.val()[a][b].addr.indexOf("경북") != -1) {
                counting++;
                this.martArray.push(sn.val()[a][b]);
                this.vacationArr.push(sn.val()[a][b].vacation);
                this.vacation = sn.val()[a][b].vacation;
                this.vacationFunc(this.week, sn.val()[a][b], counting);
              }
            }
          }
          if (this.area == "gyeongnam") {
            var counting = 0;

            for (var b in sn.val()[a]) {
              this.vacation = sn.val()[a][b].vacation;
              if (sn.val()[a][b].addr.indexOf("경남") != -1) {
                counting++;
                this.martArray.push(sn.val()[a][b]);
                this.vacationArr.push(sn.val()[a][b].vacation);
                this.vacation = sn.val()[a][b].vacation;
                this.vacationFunc(this.week, sn.val()[a][b], counting);
              }
            }
          }
          if (this.area == "busan") {
            var counting = 0;

            for (var b in sn.val()[a]) {
              this.vacation = sn.val()[a][b].vacation;
              if (sn.val()[a][b].addr.indexOf("부산") != -1) {
                counting++;
                this.martArray.push(sn.val()[a][b]);
                this.vacationArr.push(sn.val()[a][b].vacation);
                this.vacation = sn.val()[a][b].vacation;
                this.vacationFunc(this.week, sn.val()[a][b], counting);
              }
            }
          }
          if (this.area == "ulsan") {
            var counting = 0;

            for (var b in sn.val()[a]) {
              this.vacation = sn.val()[a][b].vacation;
              if (sn.val()[a][b].addr.indexOf("울산") != -1) {
                counting++;
                this.martArray.push(sn.val()[a][b]);
                this.vacationArr.push(sn.val()[a][b].vacation);
                this.vacation = sn.val()[a][b].vacation;
                this.vacationFunc(this.week, sn.val()[a][b], counting);
              }
            }
          }
          if (this.area == "jeju") {
            var counting = 0;

            for (var b in sn.val()[a]) {
              this.vacation = sn.val()[a][b].vacation;
              if (sn.val()[a][b].addr.indexOf("제주") != -1) {
                counting++;
                this.martArray.push(sn.val()[a][b]);
                this.vacationArr.push(sn.val()[a][b].vacation);
                this.vacation = sn.val()[a][b].vacation;
                this.vacationFunc(this.week, sn.val()[a][b], counting);
                
              }
            }
          }
        }
      }
    })

  }
  weekcheck(number, mart) {
    console.log(number);

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
  dayoffarray = [];
  aaa = [];
  offdayarray = [];
  vacationFunc(v, mart, count) {
    console.log(v); //this.week
    console.log(mart); //db
    console.log(count); //count
    this.cnt = count;
    console.log("mart to change json");
    console.log(this.martArray)
    console.log(mart.vacation);
    var counting = 0;
    this.dayoffarray = [];
    for (var a in v) {
      counting++;
      var flag = false;
      if (counting == 1) {
        console.log("first is");
        console.log(v[a].week, v[a].day + "," + v[a].dayofweek)//오늘 날짜
      }
      console.log(v[a].week); //몇주?
      console.log(v[a].dayofweek);//요일?

      if (mart.vacation.indexOf("첫째") > -1) {
        if (v[a].week.indexOf("첫째") > -1 && v[a].week.indexOf("둘째") > -1) {
          var weekoff = this.weekcheck("1", this.martArray[count - 1]);
          console.log("off is : " + weekoff);
          console.log(weekoff + "1111,,," + v[a].dayofweek);
          if (this.dayoffarray.length > 6) {
            console.log("hi");
          }
          else if (this.dayoffarray.length <= 6) {
            if (v[a].week.indexOf("첫째") != 0) {
              console.log("1 add 1")
              this.dayoffarray.push("영업")
            } else {
              if (weekoff == v[a].dayofweek) {
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
        console.log(v[a].week)
        if (v[a].week.indexOf("둘째") > -1 || v[a].week.indexOf("셋째") > -1) {
          var weekoff = this.weekcheck("2", this.martArray[count - 1])
          console.log("off is : " + weekoff)
          console.log(weekoff + "2222,,," + v[a].dayofweek);;
          console.log(this.week);
          if (this.dayoffarray.length > 6) {
            console.log("hi");
          }
          else if (this.dayoffarray.length <= 6) {
            if (v[a].week.indexOf("둘째") != 0) {
              console.log("2 add 1")
              this.dayoffarray.push("영업")
              flag = true;
            } else {
              if (weekoff == v[a].dayofweek) {
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
        if (v[a].week.indexOf("셋째") > -1 && v[a].week.indexOf("넷째") > -1) {
          var weekoff = this.weekcheck("3", this.martArray[count - 1])
          console.log("weekoff" + " : " + weekoff)
          console.log("off is : " + weekoff);
          console.log(weekoff + "333,,," + v[a].dayofweek);
          if (this.dayoffarray.length > 6) {
            console.log("hi");
          }
          else if (this.dayoffarray.length <= 6) {
            if (v[a].week.indexOf("셋째") != 0) {
              console.log("3 add 1")
              this.dayoffarray.push("영업")
            } else {
              if (weekoff == v[a].dayofweek) {
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
        // if(v[a].week.indexOf("넷째")>-1&&v[a].week.indexOf("다섯째")>-1){
        var weekoff = this.weekcheck("4", this.martArray[count - 1])
        console.log("off is : " + weekoff);
        console.log(v[a].week + ",," + weekoff + "444,,,,," + v[a].dayofweek);
        console.log("flag is : " + flag)
        if (this.dayoffarray.length > 6) {
          console.log("hi");
        }
        else if (this.dayoffarray.length <= 6) {
          if (v[a].week.indexOf("넷째") != 0) {
            console.log("4 add 1")
            if (!flag) {
              this.dayoffarray.push("영업")
            } else {
              flag = false;
            }

          } else {
            if (weekoff == v[a].dayofweek) {
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
        console.log("hi");
        if (this.dayoffarray.length <= 6) {
          this.dayoffarray.push("영업");
        }
      }

      console.log(this.dayoffarray);
      console.log("dayofarray")

      this.martArray[count - 1].dayoffarray = this.dayoffarray;
      console.log(this.martArray);
      console.log("done")
      console.log(this.dayoffarray);
      console.log(this.martArray[count - 1]);
      this.today = this.dayoffarray[0];

    }
    console.log(this.dayoffarray);
    this.offdayarray = this.dayoffarray;

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
            this.todayy[off2] = "설날";
            console.log(this.todayy);
            console.log(this.dayoffarray);

            this.dayoffarray[off2] = "휴무";
            console.log(this.dayoffarray);
            console.log(this.cnt);
            for (var cnt = 0; cnt < count; cnt++) {
              this.martArray[count-1].dayoffarray = this.dayoffarray;
            }
          }
          if (this.week[off2].month + "월" + this.week[off2].day == this.offdayyear[off3].chuseok) {
            console.log("추석");
            this.todayy[off2] = "추석";
            console.log(this.todayy);
            console.log(this.dayoffarray);

            this.dayoffarray[off2] = "휴무";
            console.log(this.dayoffarray);
            console.log(this.cnt);
            for (var cnt = 0; cnt < count; cnt++) {
              this.martArray[count-1].dayoffarray = this.dayoffarray;
            }
          }
        }
      }
    }

  }
  newDate() {
    console.log(this.martArray);
    console.log(this.dayoffarray);
    var days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    var prefixes = ['첫째주', '둘째주', '셋째주', '넷째주', '다섯째주'];

    this.currentMonth = this.date.getMonth() + 1;
    // this.currentMonth = this.date.getMonth() - 1;

    this.currentYear = this.date.getFullYear();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
    var dayofweek = this.date.getDay();

    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }
    var count = 0;
    console.log("1: " + this.currentDate);
    for (var i = 0; i < 7; i++) {
      console.log(thisNumOfDays);
      var dow = dayofweek++;

      if (dayofweek >= 7) { dayofweek = 0; }
      if (this.currentDate + i <= thisNumOfDays) {

        this.week.push({ "week": prefixes[0 | (this.currentDate + i - 1) / 7], "month": this.currentMonth, "day": this.currentDate + i, "dayofweek": days[dow] }); //30일
        console.log(dayofweek);
      }
      else if (this.currentDate + i > thisNumOfDays) {
        count++;
        this.week.push({ "week": prefixes[0 | (count + i - 1) / 7], "month": this.currentMonth + 1, "day": count, "dayofweek": days[dow] }); //30일
        console.log(dayofweek);
      }
      console.log(count);
    }
    console.log(this.week);
    console.log(prevNumOfDays);//첫날과 마지막 날을 제외한 이 달의 일수
    console.log(thisNumOfDays);//한 달의 날수
    console.log(lastDayThisMonth);//이 달의 마지막 날의 요일.


  }
  martfunc() {
    if (this.mart == "lottemart") {
      this.name = "롯데마트";
      this.img = "./assets/imgs/009.png";
      var newnametoinput = "";
      newnametoinput = "lotte";
      this.newfunction(newnametoinput)
      
    }
    if (this.mart == "emart") {
      this.name = "이마트";
      this.img = "./assets/imgs/010.png";
      var newnametoinput = "";
      newnametoinput = "emart";
      this.newfunction(newnametoinput)
    }
    if (this.mart == "homeplus") {
      this.name = "홈플러스";
      this.img = "./assets/imgs/011.png";
      var newnametoinput = "";
      newnametoinput = "homeplus";
      this.newfunction(newnametoinput)
    }
    if (this.mart == "costco") {
      this.name = "코스트코";
      this.img = "./assets/imgs/012.png";
      var newnametoinput = "";
      newnametoinput = "costco";
      this.newfunction(newnametoinput)
    }
    if (this.mart == "traders") {
      this.name = "이마트 트레이더스";
      this.img = "./assets/imgs/013.png";
      var newnametoinput = "";
      newnametoinput = "traders";
      this.newfunction(newnametoinput)
    }
    if (this.mart == "lottedep") {
      this.name = "롯데 백화점";
      this.img = "./assets/imgs/020.png";
      var newnametoinput = "";
      newnametoinput = "lottedep";
      this.newfunction(newnametoinput)
    }
    if (this.mart == "ssgdep") {
      this.name = "신세계 백화점";
      this.img = "./assets/imgs/021.png";
      var newnametoinput = "";
      newnametoinput = "sinsaegae";
      this.newfunction(newnametoinput)
    }
    if (this.mart == "hyundep") {
      this.name = "현대 백화점";
      this.img = "./assets/imgs/022.png";
      var newnametoinput = "";
      newnametoinput = "hyundai";
      this.newfunction(newnametoinput)
    }
    if (this.mart == "lotteout") {
      this.name = "롯데 아울렛";
      this.img = "./assets/imgs/023.png";
      var newnametoinput = "";
      newnametoinput = "lotteoutlet";
      this.newfunction(newnametoinput)
    }
  }

  favoriteList = [];
  favorite(a, idx) {
    var newnametoinput = "";
    if (this.mart == "lottemart") { newnametoinput = "lotte"; }
    if (this.mart == "emart") { newnametoinput = "emart"; }
    if (this.mart == "homeplus") { newnametoinput = "homeplus"; }
    if (this.mart == "costco") { newnametoinput = "costco"; }
    if (this.mart == "traders") { newnametoinput = "traders"; }
    if (this.mart == "lottedep") { newnametoinput = "lottedep"; }
    if (this.mart == "ssgdep") { newnametoinput = "sinsaegae"; }
    if (this.mart == "hyundep") { newnametoinput = "hyundai"; }
    if (this.mart == "lotteout") { newnametoinput = "lotteoutlet"; }
    console.log(newnametoinput);
    console.log(a);//db
    console.log(idx);
    console.log(this.martArray[idx])
    console.log(!flag);
    console.log(this.martArray);
    var flag = this.martArray[idx].favorite;
    if (flag != true) {
      this.firemain.child("users").child(this.userId).child("favorite").once("value", (sn) => {
        console.log(sn.val());
      })
      // for(var fav in this.favoriteList){
      //   for(var mart in this.martArray){
      //     if(this.favoriteList[fav].name == this.martArray[mart].name){
      //       if(this.favoriteList[fav].favorite == true){
      //         this.martArray[mart].favorite = true;
      //       }
      //     }
      //   }
      // }
      console.log(this.martArray);
        console.log(this.favoriteList);
        if (this.favoriteList.length < 20) {
          this.martArray[idx].favorite = true;
          this.firemain.child("users").child(this.userId).child("favorite").child(newnametoinput).child(a.key).update(this.martArray[idx]);
          console.log(this.martArray[idx]);

          const toast = this.toastCtrl.create({
            message: '첫 화면 "즐겨찾기"에 추가되었습니다.',
            duration: 2000,
          });
          toast.present();
        }
        else if (this.favoriteList.length >= 20) {
          let modal = this.modal.create(FavoritemodalPage, null, {
            cssClass: "modalSize"
          });
          modal.present();
        }
   

    }
    else {
      flag = false;
      console.log(flag);
      this.martArray[idx].favorite = false;
      this.firemain.child("users").child(this.userId).child("favorite").child(newnametoinput).child(a.key).remove();
      const toast = this.toastCtrl.create({
        message: '삭제되었습니다.',
        duration: 2000,
      });
      toast.present();
    }

  }

  heart() {
  }

}


