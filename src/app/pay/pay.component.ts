import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Globals } from 'app/globals';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
})
export class PayComponent implements OnInit {
  @Input("wrk_id") wrk_id;
  @Input("wrk_name") wkr_name;
  @Input("date") date;
  @Input("hour") hour;
  @Input("paid") paid;
  @Input("services") services;
  @Input("price") price;
  @Input("service_ids") service_ids;
  public myDate;

  constructor(public modalController: ModalController, public toastController: ToastController, public trans: TranslateService) {
  }

  ngOnInit() {    
    let h = this.hour.split(":");

    if(h[0].length < 2) {
      h[0] = "0" + h[0];
    }

    if(h[1].length < 2) {
      h[1] = h[1] + "0";
    }

    this.hour = h.join(":");

    this.myDate = this.date + " " + this.hour;
  }

  dismiss() {
    this.modalController.dismiss();
  }

  pay() {
    //console.log("Trabajaor: " + this.wrk_id + "\nFecha: " + this.myDate + "\nPagado: " + this.paid + "\nServicios: " + this.service_ids)
    Globals.api.postReservation(this.wrk_id, this.myDate, this.paid, this.service_ids, (status, msg) => {
      console.log(status + ": " + msg)
      if(status == null) {
        this.modalController.dismiss({ paid: false });
      } else {
        this.modalController.dismiss({ paid: true });
      }      
    });
  }

  async presentToast() {
    var text1, text2;
    this.trans.get('PAGES.PAY.RESERVATION_ON').subscribe(async (res: string) => {
      text1=res;
    });
    this.trans.get('PAGES.PAY.WITH').subscribe(async (res: string) => {
      text2=res;
    });
    const toast = await this.toastController.create({      
      message: text1 + this.myDate + text2 + this.wkr_name,
      duration: 2000
    });
    toast.present();
  }
}
