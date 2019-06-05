import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Globals } from 'app/globals';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(public modalController: ModalController, public toastController: ToastController, public router:Router, public trans: TranslateService) {     
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
    var text;
    this.trans.get('PAGES.RESERVATION.ANY_HAIRDRESSER').subscribe(async (res: string) => {
      text=res;
    });
    this.workers.unshift({id: -1, name: text});
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
      var text;
      this.trans.get('PAGES.RESERVATION.CHOOSE_DATE_FIRST').subscribe(async (res: string) => {
        text=res;
      });
      this.presentToast(text);
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
        var text;
        this.trans.get('PAGES.RESERVATION.CHOOSE_SERVICES_FIRST').subscribe(async (res: string) => {
          text=res;
        });
        this.presentToast(text);
      }      
    }

    if(this.showHourPicker && this.myHour != "") {
      this.confirm();
      this.progress = this.progress + 0.3;
    }
    
    if(this.showBrbPicker && this.wrk_id != undefined) {
      this.getHours();      
      setTimeout(()=> {  
        this.progress = this.progress + 0.3;
        this.showBrbPicker = false;      
        this.showDatePicker = true;
      }, 1000);            
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

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  toLogin() {
    this.router.navigate(["/tabs/login"]);
    this.modalController.dismiss();
  }

  updateDate(event) {   
    this.hourValues = [];
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

      let clock = { hour: new Date().getHours(), minutes: new Date().getMinutes() };
      console.log(clock)
      console.log(this.myDate + " " + new Date().getDate())
      let is_today = today_month == +this.myDate.substring(5,7) && today_day == +this.myDate.substr(8,9);
      console.log(is_today)
      
      if(typeof hours[0] !== undefined && hours[0] != undefined) {
        hours[0].forEach(val => {
          if(clock.hour <= +val.substr(0,2) && clock.minutes <= +val.substr(3,4) && is_today) {
            this.hourValues.push(val);
          } else if(!is_today) {
            this.hourValues.push(val);
          }                  
        });
      }    

      if(typeof hours[1] !== undefined && hours[1] != undefined) {
        hours[1].forEach(val => {
          if(clock.hour <= +val.substr(0,2) && clock.minutes <= +val.substr(3,4) && is_today) {
            this.hourValues.push(val);
          } else if(!is_today) {
            this.hourValues.push(val);
          }  
        }); 
      }   
      
      if(typeof hours[2] !== undefined && hours[2] != undefined) {
        hours[2].forEach(val => {
          if(clock.hour <= +val.substr(0,2) && clock.minutes <= +val.substr(3,4) && is_today) {
            this.hourValues.push(val);
          } else if(!is_today) {
            this.hourValues.push(val);
          }  
        }); 
      }   

      setTimeout(() => {
        if(this.hourValues.length < 1) {
          this.valid_date = false;
          this.showHourPicker = false;
          this.myHour = null;
          this.disableDate = false;
          var text;
          this.trans.get('PAGES.RESERVATION.AVAILABLE_HOURS').subscribe(async (res: string) => {
            text=res;
          });
          this.presentToast(text)
        } else {
          this.showHourPicker = true;
        }        
      }, 1000);      
    } else {
      this.valid_date = false;
      this.showHourPicker = false;
      this.myHour = null;
      this.disableDate = false;
    }    
  }

  updateHour(event) {
    this.myHour = event.detail.value;

    if(this.wrk_id == -1) {
      console.log(this.workers)
      this.workers = this.shuffle(this.workers); 
      let ids: number[] = [];

      this.workers.forEach(wrk => {
        let vals = Object.values(wrk);
        vals.forEach(val => {
          if(typeof val === "number" && val != -1) {
            ids.push(val);
          }
        });
      });

      ids.forEach(id => {
        Globals.api.getHours(id, (hours, msg) => {
          let days = Object.keys(hours);
          let h = Object.values(hours);
          let contain_day = days.indexOf(this.myDate) > -1;
          let contain_hour = false;
          console.log(days)
          console.log(h)
          var horas;

          if(typeof h[days.indexOf(this.myDate)] !== undefined && h[days.indexOf(this.myDate)] != undefined) {
            horas = h[days.indexOf(this.myDate)][0].hours;
            console.log(horas)

            for(let i = 0; i < horas.length || !contain_hour; i++) {
              if(horas[i] == this.myHour) {
                contain_hour = true;
              }
            }
          } 

          if(contain_day && contain_hour) {
            this.wrk_id = id;
            console.log(this.wrk_id)
            return;
          } else {
            this.disableDate = false;
            this.valid_date = false;
          }          
        });
      });
    }    
  }

  updateWorkers(event) {
    this.wrk_id = +event.detail.value.substr(0, event.detail.value.indexOf(","));
    this.wrk_name = event.detail.value.substr(event.detail.value.indexOf(",") + 1, event.detail.value.length - 1)
    this.disableWrk = true;  
  }
}
