import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-brbshop-detail',
  templateUrl: './brbshop-detail.page.html',
  styleUrls: ['./brbshop-detail.page.scss'],
})

export class BrbshopDetailPage implements OnInit {
  dateOfevent:string= new Date().toISOString();
  text: string = "";
  public list_id:number;
  public id:number;
  constructor(private datePicker: DatePicker, private launchNavigator: LaunchNavigator, private route:ActivatedRoute,private router: Router) { }

  options: LaunchNavigatorOptions = {
    start: 'Spain, ON'
  }

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
    this.list_id=parseInt(this.route.snapshot.paramMap.get('id'));
    this.id=parseInt(this.route.snapshot.paramMap.get('detail_id'));
    console.log("LISTA: "+this.list_id+" BARBERIA: "+this.id);
  }

  showLocation() {
    this.launchNavigator.navigate('Toronto, ON', this.options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }
}
