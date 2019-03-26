import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brbshop-detail',
  templateUrl: './brbshop-detail.page.html',
  styleUrls: ['./brbshop-detail.page.scss'],
})

export class BrbshopDetailPage implements OnInit {
  dateOfevent:string= new Date().toISOString();
  text: string = "";
  constructor() { }

  slider = [
    {
      image: "assets/imgs/barber1.jpg"
    },
    {
      image: "assets/imgs/barber2.jpg"
    },
    {
      image: "assets/imgs/barber3.jpg"
    }
  ]

  ngOnInit() {
  }

  date () {
    this.text = this.dateOfevent.substr(0,10);
    console.log("Fecha seleccionada ", this.dateOfevent.substr(0,10));
  }
}
