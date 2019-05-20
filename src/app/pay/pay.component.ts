import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Globals } from 'app/globals';

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

  constructor(public modalController: ModalController) {
  }

  ngOnInit() {
    this.myDate = this.date + " " + this.hour;
    let compare = this.myDate.substr(this.myDate.indexOf(" ") + 1, this.myDate.length - 1);
    if(compare.length !== 5) {
      this.myDate = this.myDate + "0";
    }
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
}
