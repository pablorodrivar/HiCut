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
import { GalleryComponent } from '../gallery/gallery.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ReservationComponent } from 'app/reservation/reservation.component';

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
  public myHour: any;
  public myDate: any;
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
  public address: string;
  public tab: any;
  public phone: string;
  public email: string;
  
  constructor(private datePicker: DatePicker, private launchNavigator: LaunchNavigator, private route:ActivatedRoute,private router: Router,
    public alertController: AlertController, public loadingController: LoadingController, public toastController: ToastController,
    public modalController: ModalController, public payComponent: PayComponent, public domController: DomSanitizer, public galleryComponent: GalleryComponent) {
      this.price = 0;
      this.tab = "main";
    }

  options: LaunchNavigatorOptions = {
    start: 'Spain, ON'
  }

  ngOnInit() {   
    this.tab = "main"; 
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
    this.confirmed = false;
    this.wrk_id = null;
    this.refresh(); 
  }

  getBrbShop() {
    Globals.api.getHairdressing(this.filter, (list, error) => {
      if(list != null) {
        this.barbershop = list;
      } else {
        console.log(error)
      }

      this.slider = this.barbershop[0].imglist;      
      this.tb_image = this.slider[0];
      this.style = "--background: linear-gradient(162deg, transparent 20%, rgba(56, 70, 108, .8) 100%), url('http://80.211.65.79:8000/"+this.tb_image+"') center no-repeat; filter: blur(5px); -webkit-filter:blur(5px); min-height: 75px; color: white;";
      this.style = this.domController.bypassSecurityTrustStyle(this.style);
      this.name = this.barbershop[0].name;   
      this.address = this.barbershop[0].address;
      this.phone = this.barbershop[0].tlf;
      this.email = this.barbershop[0].email;

      Globals.api.getComments(this.barbershop[0].id, (comment, msg) => {
        this.comments = comment;        
      });      

      Globals.api.getRating(this.barbershop[0].id, (rate, error) => {
        this.brb_rating = rate.stars;
        this.total_rate = rate.total;
      });
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

  async pay() {
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

  async reservation() {
    const myModal = await this.modalController.create({
      component: ReservationComponent,
      cssClass: 'reservation-css',
      componentProps: { services: this.services, workers: this.workers }
    });

    myModal.onDidDismiss().then(data => {
      if(typeof data.data !== undefined && data.data !== undefined) {
        this.wrk_id = data.data.wrk_id;
        this.wrk_name = data.data.wrk_name;
        this.myHour = data.data.hour;
        this.myDate = data.data.date;
        this.snames = data.data.services;
        this.price = data.data.price;
        this.service_ids = data.data.service_ids;
        this.pay();   
      }       
    });

    return await myModal.present();
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

  async showImage(event) {
    const img = event.srcElement.currentSrc;
    console.log(event)
    const modal = await this.modalController.create({
      component: GalleryComponent,
      cssClass: 'custom-gallery-component',
      componentProps: { img: img, name: this.name, slider: this.slider }
    });

    return await modal.present();
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
}
