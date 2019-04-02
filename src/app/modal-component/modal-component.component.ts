import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss'],
})
export class ModalComponent implements OnInit {

  constructor(navParams: NavParams, private navController: NavController) {
    // componentProps can also be accessed at construction time using NavParams
  }

  ngOnInit() {}

  closeModal() {
    this.navController.pop();
  }
}
