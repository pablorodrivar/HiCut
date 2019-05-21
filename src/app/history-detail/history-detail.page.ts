import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Globals } from 'app/globals';
import { ToastController } from '@ionic/angular';

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

  constructor( private route:ActivatedRoute,public toastController: ToastController) {
  }

  ionViewWillEnter(){
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    Globals.api.reservation(this.id,(reservation,error)=>{
      if (error != ""){
        this.presentToast(error);
      }
      else{
        console.log(reservation);
        this.reservation=reservation;
      }
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

}
