import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss'],
})
export class ModalComponent implements OnInit {
  public data = [];
  public distance: number;
  public services = [{
    "hair_cut": 0,
    "shaving": 0,
    "beard_trim": 0,
    "hair_dying": 0,
  }];

  constructor(navParams: NavParams, public modalController: ModalController) {
    // componentProps can also be accessed at construction time using NavParams
    console.log('values', navParams.get('value'))
    modalController.dismiss();
  }

  ngOnInit() {}

  dismiss() {
    this.data = [this.distance, this.services];
    this.modalController.dismiss(this.data);
  }
}
