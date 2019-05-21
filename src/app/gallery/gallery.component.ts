import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input("img") img;
  @Input("name") name;
  @Input("slider") slider;

  constructor(public modalController: ModalController) { }

  ngOnInit() {

  }

  dismiss() {
    this.modalController.dismiss();
  }
}
