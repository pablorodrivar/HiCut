import { Component } from '@angular/core';
import { Reservation } from '../../classes/pojo/reservation';
import { Router } from '@angular/router';
import { Globals } from 'app/app.module';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})



export class HistoryPage {
  public history_list:Reservation[];

  constructor(private router:Router,public toastController: ToastController){
    Globals.api.getListReservations((list,msg)=>{
      if (list!=null){
        this.history_list = list;
      }
      else{
        this.presentToast(msg);
      }
    });
  }

  goToHistoryDetail(event, item){
    this.router.navigate(["/tabs/history/history_detail/1"]);
  }
  
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }
}
