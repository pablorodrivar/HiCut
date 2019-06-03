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
  public sort_opt: string;
  public services: any[] = [];

  constructor(navParams: NavParams, public modalController: ModalController) {
    // componentProps can also be accessed at construction time using NavParams
    //console.log('values', navParams.get('value'))
    this.list_id = navParams.get('id');
    this.sort_opt = "dist";
  }

  ngOnInit() {}

  dismissData() {
    this.data = [{distance: this.distance, services: this.services, sort_opt: this.sort_opt}];
    this.modalController.dismiss(this.data);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  sortBy(opt: number) {
    if(opt == 0) {
      this.sort_opt = "dist";
    } else if (opt == 1) {
      this.sort_opt = "rat";
    } else if (opt == 2) {
      this.sort_opt = "alp";
    }
  }

  /*getServices(event) {
    this.services = event.detail.value;    
  }*/
}
