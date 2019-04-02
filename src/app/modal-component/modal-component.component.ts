import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss'],
})
export class ModalComponent implements OnInit {

  constructor(navParams: NavParams, public modalController: ModalController) {
    // componentProps can also be accessed at construction time using NavParams
    console.log('values', navParams.get('value'))
    modalController.dismiss();
  }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }
}
