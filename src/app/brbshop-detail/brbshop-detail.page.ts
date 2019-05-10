import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Globals } from 'app/globals';
import { Filter } from 'classes/pojo/filter';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-brbshop-detail',
  templateUrl: './brbshop-detail.page.html',
  styleUrls: ['./brbshop-detail.page.scss'],
})

export class BrbshopDetailPage implements OnInit {
  dateOfevent:string= new Date().toISOString();
  text: string = "";
  public comment: any;
  public subject: string;
  public comment_text: string;
  public rate: any;
  public total_rate: any;
  public brb_rating: any;
  public list_id:number;
  public id:number;
  public filter = new Filter();
  public barbershop: any;
  public slider: any[] = [];
  public comments: any[] = [];
  public name: string;
  public is_loged: boolean;
  public days_raw: any[] = [];
  public days: any[] = [];
  public months: number[] = [];
  public years: number[] = [];
  public yearValues: string;
  public monthValues: string;
  public hourValues: any[] = [];
  public myDate: string;
  public myHour: string;
  public showHourPicker: boolean;
  public showDatePicker: boolean = false;
  public services: any[] = [];
  public price: number;
  public workers: any[] = [];
  public wrk_id: any;
  
  constructor(private datePicker: DatePicker, private launchNavigator: LaunchNavigator, private route:ActivatedRoute,private router: Router,
    public alertController: AlertController, public loadingController: LoadingController, public toastController: ToastController,) { 
      this.showHourPicker = false;
      this.price = 0;
    }

  options: LaunchNavigatorOptions = {
    start: 'Spain, ON'
  }

  ngOnInit() {    
    this.comments = [];
    this.is_loged = Globals.api.isLoged();
    this.list_id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.id = parseInt(this.route.snapshot.paramMap.get('detail_id'));

    this.presentLoading();

    this.filter.id = this.id;

    this.getBrbShop();   
    this.getWorkers();
    //this.getHours();
    this.getServices();
  }

  showLocation() {
    let destination = [this.filter.lat, this.filter.lng];
    this.launchNavigator.navigate(destination, this.options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  getBrbShop() {
    Globals.api.getHairdressing(this.filter, (list, error) => {
      if(list != null) {
        this.barbershop = list;
      } else {
        console.log(error)
      }

      this.slider = this.barbershop[0].imglist;
      this.name = this.barbershop[0].name;          

      Globals.api.getComments(this.barbershop[0].id, (comment, msg) => {
        this.comments = comment;        
      });      

      Globals.api.getRating(this.id, (rate, error) => {
        this.brb_rating = rate.stars;
        this.total_rate = rate.total;
      });
    });    
  }

  getWorkers() {
    Globals.api.getHairdressers(this.id, (hairdressers, msg) => {
      console.log(hairdressers)
      this.workers = hairdressers;      
    });         
  }

  updateWorkers(event) {
    this.wrk_id = +event.detail.value;
    this.showDatePicker = true;

    if(this.showDatePicker) {
      this.getHours();
    }  
  }

  getHours() {
    Globals.api.getHours(this.wrk_id, (hours, msg) => {
      this.days = hours;
      this.days_raw = Object.keys(hours);

      const distinct = (value, index, self) => {
        return self.indexOf(value) == index;
      }

      this.days_raw.forEach(element => {
        let val = element.split("-");
        this.years.push(+val[0]);
        this.months.push(+val[1])
      });

      this.years = this.years.filter(distinct);
      this.months = this.months.filter(distinct);
      this.yearValues = this.years.join(",");
      this.monthValues = this.months.join(",");
    });  
  }

  getServices() {
    Globals.api.getServices(this.id, (services, msg) => {
      this.services = services;      
    });
  }

  sendComment() {
    if(typeof this.subject === undefined || this.subject == undefined || typeof this.comment_text === undefined
      || this.comment_text == undefined || typeof this.rate === undefined || this.rate == undefined) {
        this.presentToast();
    } else {
      this.comment = {hairdressing: this.id, subject: this.subject, comment: this.comment, rate: this.rate};
      Globals.api.comment(this.comment, (msg) => {
        console.log(msg)
      });

      this.refresh();
    } 

  }

  getRating(event) {
    this.rate = event.detail.value;
  }

  gServices(event) {
    this.price = 0;
    event.detail.value.forEach(element => {
      this.price = this.price + +element;
    });
  }

  refresh() {
    setTimeout(() => {
      this.ngOnInit();
    }, 1000);
  }

  goToLogin() {
    this.router.navigate(["/tabs/login"]);
  }

  singleRate() {
    //TODO
  }

  updateDate(event) {   
    let date:string = event.detail.value;
    date = date.substr(0, date.indexOf("T"));
    let i = 0;
    let pos = 0;
    this.days_raw.forEach(val =>{    
      if(date == val) {
        pos = i;
      }

      i = i + 1;
    });

    let ar = Object.values(this.days);
    let nice = ar[pos];

    let hours: any[] = [];

    nice.forEach(val => {
      hours.push(val.hours)
    });

    hours[0].forEach(val => {
      this.hourValues.push(val);
    });

    hours[1].forEach(val => {
      this.hourValues.push(val);
    });

    this.showHourPicker = true;
  }

  updateHour(event) {
    this.myHour = event.detail.value;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Fill all the fields.',
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 1000
    });
    await loading.present();
  }
}
