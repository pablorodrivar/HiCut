import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Globals } from 'app/globals';
import { Filter } from 'classes/pojo/filter';

@Component({
  selector: 'app-brbshop-detail',
  templateUrl: './brbshop-detail.page.html',
  styleUrls: ['./brbshop-detail.page.scss'],
})

export class BrbshopDetailPage implements OnInit {
  dateOfevent:string= new Date().toISOString();
  text: string = "";
  public comment: any;
  public list_id:number;
  public id:number;
  public filter = new Filter();
  public barbershop: any;
  public slider: any[] = [];
  //public events:any;
  constructor(private datePicker: DatePicker, private launchNavigator: LaunchNavigator, private route:ActivatedRoute,private router: Router,
    public alertController: AlertController/*, private jsonp: Jsonp*/) { }

  options: LaunchNavigatorOptions = {
    start: 'Spain, ON'
  }

  dayNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",];  

  async ngOnInit() {
    this.list_id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.id = parseInt(this.route.snapshot.paramMap.get('detail_id'));

    console.log("LISTA: "+this.list_id+" BARBERIA: "+this.id);

    this.filter.id = this.id;
    await Globals.api.getHairdressing(this.filter, (list, error) => {
      if(list != null) {
        console.log(list)
        this.barbershop = list;
      } else {
        console.log(error)
      }
    
      this.slider = this.barbershop[0].imglist;
    });    
    /*this.jsonp.request('https://trial.mobiscroll.com/events/?callback=JSONP_CALLBACK').subscribe((res: any) => {
            this.events = res._body;
        });*/
  }

  /*eventSettings: MbscEventcalendarOptions = {
    lang: 'de',
    theme: 'ios',
    display: 'inline',
    view: {
        calendar: { type: 'month' },
        eventList: { type: 'month', scrollable: true }
    }
  };*/

  showLocation() {
    let destination = [this.filter.lat, this.filter.lng];
    this.launchNavigator.navigate(destination, this.options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Prompt!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        {
          name: 'name3',
          value: 'http://ionicframework.com',
          type: 'url',
          placeholder: 'Favorite site ever'
        },
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10
        },
        {
          name: 'name7',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
  }
}
