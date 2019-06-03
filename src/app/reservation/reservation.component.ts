import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Globals } from 'app/globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  @Input("services") services;
  @Input("workers") workers;
  public showServices = true;
  public price: number;
  public service_ids: number[] = [];
  public selectedServices: any[] = [];
  public service_names: any[] = [];
  public snames: string;
  public showCancel: boolean;
  public showPrice: boolean;
  public showBrbPicker: boolean;
  public showDatePicker: boolean;
  public back_disabled: boolean;
  public forward_disabled: boolean;
  public myDate: string;
  public monthValues: string;
  public yearValues: string;
  public disableDate: boolean = false;
  public showHourPicker: boolean;
  public days_raw: any[] = [];
  public days: any[] = [];
  public years: number[] = [];
  public months: number[] = [];
  public hourValues: any[] = [];
  public wrk_id: any;
  public wrk_name: string;
  public disableWrk: boolean = false;
  public myHour: string;
  public confirmed: boolean = false;
  public progress: number = 0;
  public isLoged: boolean;
  public opened = false;
  public valid_date: boolean = true;

  constructor(public modalController: ModalController, public toastController: ToastController, public router:Router) {     
    this.showHourPicker = false;
    this.progress = 0;
  }

  ngOnInit() {
    this.isLoged = Globals.api.isLoged();
    this.showServices = true;
    this.showDatePicker = false;
    this.back_disabled = true;
    this.forward_disabled = false;
    this.disableDate = false;
    this.progress = 0;
    this.workers.unshift({id: -1, name: "Any Hairdresser"});
  }

  back() {
    if(this.showServices) {
      this.progress = this.progress - 0.3;
      this.back_disabled = true;
      this.forward_disabled = false;
      this.showDatePicker = false;
      this.showBrbPicker = false;
      this.showHourPicker = false;
    } else if(this.showBrbPicker) {
      this.progress = this.progress - 0.3;
      this.back_disabled = false;
      this.showDatePicker = false;
      this.showHourPicker = false;
      this.showBrbPicker = false;
      this.showServices = true;
    } else if (this.showDatePicker || this.showHourPicker) {
      this.progress = this.progress - 0.3;
      this.wrk_id = null;
      this.wrk_name = null;
      this.disableWrk = false;
      this.disableDate = false;
      this.myDate = null;
      this.myHour = null;
      this.back_disabled = false;
      this.showDatePicker = false;
      this.showHourPicker = false;
      this.showBrbPicker = true;
      this.showServices = false;
    }
  }

  confirm() {
    if(typeof this.myHour === undefined || this.myHour == undefined) {
      this.presentToast("Choose a date first");
    } else {
      this.confirmed = true;
      this.modalController.dismiss({ wrk_id: this.wrk_id, wrk_name: this.wrk_name, hour: this.myHour, date: this.myDate,  paid: 1, services: this.snames,
        price: this.price, service_ids: this.service_ids  });
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  forward() {
    if(this.showServices) {
      if(this.service_ids.length != 0) {
        this.progress = this.progress + 0.3;
        this.back_disabled = false;
        this.forward_disabled = false;
  
        this.showDatePicker = false;
        this.showHourPicker = false;
        this.showServices = false;
        this.showBrbPicker = true;
      } else {
        this.presentToast("Choose some services first");
      }      
    }

    if(this.showHourPicker && this.myHour != "") {
      this.confirm();
      this.progress = this.progress + 0.3;
    }
    
    if(this.showBrbPicker && this.wrk_id != undefined) {
      this.progress = this.progress + 0.3;
      this.showBrbPicker = false;      
      this.showDatePicker = true;
      this.getHours();
    } /*else {
      if(this.opened){
        this.presentToast("Choose a barber first")
        this.opened = false;
      }     
      this.opened = true; 
    }*/
  }

  getHours() {
    if(this.wrk_id == -1) {
      this.workers.forEach(wrk => {
        if(wrk.id != -1) {
          Globals.api.getHours(wrk.id, (hours, msg) => {
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
      });
    } else {
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
  }

  gServices(event) {
    this.showPrice = true;
    this.price = 0;
    this.service_ids = [];
    this.service_names = [];
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

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  toLogin() {
    this.router.navigate(["/tabs/login"]);
    this.modalController.dismiss();
  }

  updateDate(event) {   
    this.disableDate = true;
    let date:string = event.detail.value;    
    date = date.substr(0, date.indexOf("T"));    
    this.myDate = date;
    let today_day = new Date().getDate();
    let today_month = new Date().getMonth() + 1;
    let today_year = new Date().getFullYear();        

    if(today_year <= +this.myDate.substr(0, 4) && today_month <= +this.myDate.substring(5,7) && today_day <= +this.myDate.substr(8,9)) {
      this.valid_date = true;

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
      console.log(nice)

      let hours: any[] = [];

      nice.forEach(val => {
        hours.push(val.hours)
      });

      this.showHourPicker = true;

      console.log(hours)
      
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
      
      if(typeof hours[2] !== undefined && hours[2] != undefined) {
        hours[2].forEach(val => {
          this.hourValues.push(val);
        }); 
      }    
    } else {
      this.valid_date = false;
      this.showHourPicker = false;
      this.myHour = null;
      this.disableDate = false;
    }    
  }

  updateHour(event) {
    this.myHour = event.detail.value;
  }

  updateWorkers(event) {
    this.wrk_id = +event.detail.value.substr(0, event.detail.value.indexOf(","));
    this.wrk_name = event.detail.value.substr(event.detail.value.indexOf(",") + 1, event.detail.value.length - 1)
    this.disableWrk = true;  
  }
}
