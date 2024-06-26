import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Globals } from 'app/globals';
import { ToastController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.page.html',
  styleUrls: ['./history-detail.page.scss'],
})
export class HistoryDetailPage {

  id:number;
  reservation:any;
  hairdresser:any;
  hairdressing:any;
  currentDate=new Date();
  constructor(private router:Router, private route:ActivatedRoute,public toastController: ToastController,public loadingController: LoadingController,public trans: TranslateService) {
  }

  async ionViewWillEnter(){
    var loading = await this.loadingController.create();
    await loading.present();
    this.currentDate=new Date();
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    Globals.api.reservation(this.id,(reservation,error)=>{
      loading.dismiss();
      if (error != ""){
        this.router.navigate(["/tabs/history"]);
        this.presentToast(error);
      }
      else{
        this.reservation=reservation;
      }
    });
  }

  async cancelReservation(){
    if (!this.isOld()){
      var loading = await this.loadingController.create();
      await loading.present();
      Globals.api.cancelreservation(this.reservation.id,(status,msg)=>{
        loading.dismiss();
        if (status==="OK"){
          this.trans.get('PAGES.HISTORY_DETAILS.CANCEL_OK').subscribe((res: string) => {
            this.presentToast(res);
          });
          
          this.router.navigate(["/tabs/history"]);
        }
        else{
          this.trans.get('PAGES.HISTORY_DETAILS.CANCEL_ERROR').subscribe((res: string) => {
            this.presentToast(res);
          });
        }
      });
    }
  }

  isOld(){
    return Date.parse(this.reservation.date)<this.currentDate.getTime()-7200;
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

}
