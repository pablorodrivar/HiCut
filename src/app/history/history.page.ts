import { Component } from '@angular/core';
import { Reservation } from '../../classes/pojo/reservation';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})

export class HistoryPage {
  public history_list:Reservation[];
  public currentDate = new Date();

  constructor(private router:Router,public toastController: ToastController,public loadingController: LoadingController){

  }

  async ionViewWillEnter(){
    var loading = await this.loadingController.create();
    await loading.present();
    this.currentDate=new Date();
    Globals.api.getListReservations((list,msg)=>{
      loading.dismiss();
      this.history_list = list;
      if (list==null){
        if (msg!=="error.not_loged"){
          this.presentToast(msg);
        }
      }
    });
  }

  isOld(date){
    return Date.parse(date)<this.currentDate.getTime();
  }

  goToRegister(event){
    this.router.navigate(["/tabs/register"]);
  }

  goToHistoryDetail(event, item){
    this.router.navigate(["/tabs/history/history_detail/"+item.id]);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }
}
