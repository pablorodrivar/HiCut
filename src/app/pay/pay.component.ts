import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Globals } from 'app/globals';
import { ToastController } from '@ionic/angular';

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

  constructor(public modalController: ModalController, public toastController: ToastController) {
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
    console.log(this.hour);

    this.myDate = this.date + " " + this.hour;
  }

  dismiss() {
    this.modalController.dismiss();
  }

  pay() {
    Globals.api.postReservation(this.wrk_id, this.myDate, this.paid, this.service_ids, (status, msg) => {
      console.log(msg)
      this.modalController.dismiss();
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Reservation on ' + this.myDate + ' with ' + this.wkr_name,
      duration: 2000
    });
    toast.present();
  }
}
