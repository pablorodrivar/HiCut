import { Component, OnInit } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Globals } from 'app/globals';
import { Filter } from 'classes/pojo/filter';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PayComponent } from '../pay/pay.component';
import { DomSanitizer } from '@angular/platform-browser';


const url = "http://80.211.65.79:8000/";

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
  public showBrbPicker: boolean = false;
  public showServices: boolean = true;
  public showCancel: boolean = false;
  public showPrice: boolean = false;
  public services: any[] = [];
  public selectedServices: any[] = [];
  public price: number;
  public workers: any[] = [];
  public wrk_id: any;
  public confirmed: boolean = false;
  public disableWrk: boolean = false;
  public disableDate: boolean = false;
  public service_names: string[] = [];
  public service_ids: number[] = [];
  public snames: string;
  public wrk_name: string;
  public tb_image: any;
  public style: any;
  public tab: any;
  
  constructor(private datePicker: DatePicker, private launchNavigator: LaunchNavigator, private route:ActivatedRoute,private router: Router,
    public alertController: AlertController, public loadingController: LoadingController, public toastController: ToastController,
    public modalController: ModalController, public payComponent: PayComponent, public sanitiyation: DomSanitizer) { 
      this.showHourPicker = false;
      this.price = 0;
      this.showCancel = false;
      this.showPrice = false;
      this.tab = "main";
    }

  options: LaunchNavigatorOptions = {
    start: 'Spain, ON'
  }

  ngOnInit() {   
    this.tab = "main"; 
    this.showPrice = false;
    this.showCancel = false;
    this.showServices = true;
    this.disableDate = false;
    this.disableWrk = false;
    this.comments = [];
    this.service_names = [];
    this.snames = "";
    this.is_loged = Globals.api.isLoged();
    this.list_id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.id = parseInt(this.route.snapshot.paramMap.get('detail_id'));

    this.presentLoading();

    this.filter.id = this.id;

    this.getBrbShop();   
    this.getWorkers();
    this.getServices();
  }

  cancel() {    
    this.showPrice = false;
    this.confirmed = false;
    this.wrk_id = null;
    this.myDate = "";
    this.myHour = "";
    this.showBrbPicker = false;
    this.showDatePicker = false;
    this.showHourPicker = false;
    this.yearValues = null;
    this.monthValues = null;   
    this.refresh(); 
  }

  confirm() {
    if(typeof this.myHour === undefined || this.myHour == undefined) {
      this.presentToast();
    } else {
      this.confirmed = true;
      this.showDatePicker = false;
      this.showHourPicker = false;
      this.showBrbPicker = false;
      this.showServices = false;
    }
  }

  getBrbShop() {
    Globals.api.getHairdressing(this.filter, (list, error) => {
      if(list != null) {
        this.barbershop = list;
      } else {
        console.log(error)
      }

      this.slider = this.barbershop[0].imglist;
      //this.tb_image = this.sanitiyation.bypassSecurityTrustUrl("https://80.211.65.79:8000/"+this.slider[0]);
      this.tb_image = this.slider[0];
      this.style = "--background: linear-gradient(162deg, transparent 20%, rgba(56, 70, 108, .8) 100%), url('http://80.211.65.79:8000/"+this.tb_image+"') center no-repeat; filter: blur(5px); -webkit-filter:blur(5px); min-height: 75px; color: white;";
      this.style = this.sanitiyation.bypassSecurityTrustStyle(this.style);
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

  getRating(event) {
    this.rate = event.detail.value;
  }

  getServices() {
    Globals.api.getServices(this.id, (services, msg) => {
      this.services = services;      
    });
  }

  getWorkers() {
    Globals.api.getHairdressers(this.id, (hairdressers, msg) => {
      this.workers = hairdressers;      
    });         
  }

  goToLogin() {
    this.router.navigate(["/tabs/login"]);
  }

  gServices(event) {
    this.showCancel = true;
    this.showPrice = true;
    this.showBrbPicker = true;
    this.price = 0;
    this.service_ids = [];
    if(typeof event.detail.value !== undefined && event.detail.value != undefined && event.detail.value != null 
      && event.detail.value != "") {
      this.selectedServices = event.detail.value;
        this.selectedServices.forEach(element => {
          let id = element.substr(0, element.indexOf("|"));
          let price = element.substr(element.indexOf("|")+1, element.indexOf(",")-2);
          let service_name = element.substr(element.indexOf(",") + 1, element.length - 1)
          if(price.indexOf(",") > -1){
            price = price.replace(",", "");
          }
          this.price = this.price + +price;
          this.service_names.push(service_name);
          this.service_ids.push(id);
        });  
        this.snames = this.service_names.join(", ");
    }
  }

  async pay() {
    console.log(this.selectedServices)
    const myModal = await this.modalController.create({
      component: PayComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: { wrk_id: this.wrk_id, wrk_name: this.wrk_name, hour: this.myHour, date: this.myDate,  paid: 1, services: this.snames,
      price: this.price, service_ids: this.service_ids } 
    });

    myModal.onDidDismiss().then((data) => {
      this.cancel();
    });

    return await myModal.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 1000,
      message: "Loading Hairdresser"
    });
    await loading.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Fill all the fields.',
      duration: 2000
    });
    toast.present();
  }

  refresh() {
    setTimeout(() => {
      this.ngOnInit();
    }, 1000);
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

  showLocation() {
    let destination = [this.filter.lat, this.filter.lng];
    this.launchNavigator.navigate(destination, this.options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );
  }

  singleRate() {
    Globals.api.rate(this.id, this.rate, (status, msg) => {
      console.log(status);
      this.refresh();
    });
  }

  updateDate(event) {   
    this.disableDate = true;
    let date:string = event.detail.value;    
    date = date.substr(0, date.indexOf("T"));    
    this.myDate = date;
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

    this.showHourPicker = true;
    
    if(typeof hours[0] !== undefined && hours[0] != undefined) {
      hours[0].forEach(val => {
        this.hourValues.push(val);
      });
    }    

    if(typeof hours[1] !== undefined && hours[1] != undefined) {
      hours[1].forEach(val => {
        this.hourValues.push(val);
      }); 
    }       
  }

  updateHour(event) {
    this.myHour = event.detail.value;
  }

  updateWorkers(event) {
    this.wrk_id = +event.detail.value.substr(0, event.detail.value.indexOf(","));
    this.wrk_name = event.detail.value.substr(event.detail.value.indexOf(",") + 1, event.detail.value.length - 1)
    this.showDatePicker = true;
    this.disableWrk = true;

    if(this.showDatePicker) {
      this.getHours();
    }  
  }
}
