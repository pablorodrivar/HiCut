import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Globals } from 'app/globals';
import { ToastController, LoadingController } from '@ionic/angular';

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
  constructor(private router:Router, private route:ActivatedRoute,public toastController: ToastController,public loadingController: LoadingController) {
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
          this.presentToast("Reserva cancelada");
          this.router.navigate(["/tabs/history"]);
        }
        else{
          this.presentToast("No se puede cancelar esta reserva");
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
