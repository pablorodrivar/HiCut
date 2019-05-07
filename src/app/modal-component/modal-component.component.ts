import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss'],
})
export class ModalComponent implements OnInit {
  public data = [];
  public location: string;
  public distance: number;
  public list_id: number;
  public services = [{
    "hair_cut": 0,
    "shaving": 0,
    "beard_trim": 0,
    "hair_dying": 0,
  }];

  constructor(navParams: NavParams, public modalController: ModalController) {
    // componentProps can also be accessed at construction time using NavParams
    //console.log('values', navParams.get('value'))
    this.list_id = navParams.get('id');
  }

  ngOnInit() {}

  dismissData() {
    this.data = [this.location, this.distance, this.services];
    this.modalController.dismiss(this.data);
  }
}
