import { Component } from '@angular/core';
import { Platform ,App,AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';

import { HomePage } from '../pages/home/home';
import { MartinfoviewPage } from '../pages/martinfoview/martinfoview'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  // rootPage:any = MartinfoviewPage;

  constructor(public mobiel:MobileAccessibility,public screen:ScreenOrientation,public alertCtrl : AlertController,public app:App,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.mobiel.setTextZoom(100)
      if(platform.is('android') ) {
        // statusBar.backgroundColorByHexString('#ffffff');
      };
     

      if(platform.is("android")||platform.is("ios")){
    
        // screen.lock(screen.ORIENTATIONS.PORTRAIT_PRIMARY);
  
      }
      platform.registerBackButtonAction(() => {
        let nav = app.getActiveNav();
        let activeView = nav.getActive();
      
      console.log("back pressed");
      console.log(activeView)
            if(activeView != null){
              window.alert(nav.getActive().component.name)
              if (nav.getActive().component.name=="HomePage"){


        let alert1 = this.alertCtrl.create({      
          subTitle: '앱을 종료하시겠습니까?',
          buttons: [
              {
                  text: '취소',
                  cssClass: 'cancel',
                  handler: data => {
                      // console.log("Cancel...", id);
                  }
              },
              {
                  text: '확인',
                  cssClass: 'confirm',
                  handler: data => {
                      platform.exitApp();
                  }
              }
          ]
        });
        alert1.present({animate:false});


              }
              if(nav.canGoBack()) {
        nav.pop();
              }else if (nav.getActive().component.name=="HomePage"){



        // let alert1 = this.alertCtrl.create({      
        //       subTitle: '앱을 종료하시겠습니까?',
        //       buttons: [
        //           {
        //               text: '취소',
        //               cssClass: 'cancel',
        //               handler: data => {
        //                   // console.log("Cancel...", id);
        //               }
        //           },
        //           {
        //               text: '확인',
        //               cssClass: 'confirm',
        //               handler: data => {
        //                   platform.exitApp();
        //               }
        //           }
        //       ]
        //     });
        //     alert1.present({animate:false});


              }
             }
          });
    //   this.platform.registerBackButtonAction(() => {
    //     const overlay = this.app._appRoot._overlayPortal.getActive();
    //     const modallay = this.app._appRoot._modalPortal.getActive();
    //     if(overlay && overlay.dismiss) {
    //         overlay.dismiss({}, "", {animate:false});
    //     } else if(modallay && modallay.dismiss) {
    //         modallay.dismiss({}, "", {animate:false});
    //     } else if(this.navCtrl.canGoBack()){
    //         this.navCtrl.pop({animate:false});
    //     } else {
    //       if( this.navCtrl.getActive().component !== HomePage) {
    //         window.alert(this.navCtrl.getActive().component);
    //         if( this.navCtrl.getActive().component !== TermPage) {
              
    //         }
    //           this.app.getActiveNav().pop();
    //       }
    //       else {
    //         let alert1 = this.alertCtrl.create({      
    //           subTitle: '앱을 종료하시겠습니까?',
    //           buttons: [
    //               {
    //                   text: '취소',
    //                   cssClass: 'cancel',
    //                   handler: data => {
    //                       // console.log("Cancel...", id);
    //                   }
    //               },
    //               {
    //                   text: '확인',
    //                   cssClass: 'confirm',
    //                   handler: data => {
    //                       this.platform.exitApp();
    //                   }
    //               }
    //           ]
    //         });
    //         alert1.present({animate:false});
    //       }
    //     }
    // }, 1);




    });
  }
}

