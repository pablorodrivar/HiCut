import { Component, OnInit } from '@angular/core';
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
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComponent } from 'app/email/email.component';
import { InfoComponent } from '../info/info.component';
import { ApiController } from 'classes/api.controller';
import { TranslateService } from '@ngx-translate/core';


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
  public url: string;
  public desc: string;
  public coms: any[] = [];
  public already_com: boolean = false;
  public user_id: number;
  public edit_comment: boolean = false;
  public rate_placeholder: string;
  public showD = true;
  
  constructor(private launchNavigator: LaunchNavigator, private route:ActivatedRoute,private router: Router,
    public alertController: AlertController, public loadingController: LoadingController, public toastController: ToastController,
    public modalController: ModalController, public payComponent: PayComponent, public domController: DomSanitizer, public galleryComponent: GalleryComponent,
    public callNumber: CallNumber, public trans: TranslateService) {
      this.price = 0;
      this.tab = "main";
      this.url = ApiController.api_url;
      this.showD = true;
    }

  options: LaunchNavigatorOptions = {
    start: [this.filter.lat, this.filter.lng]    
  }

  ngOnInit() {   
    this.disableDate = false;
    this.disableWrk = false;
    this.comments = [];
    this.coms = [];
    this.service_names = [];
    this.snames = "";
    this.subject = "";
    this.comment_text = "";
    this.rate = null;
    this.is_loged = Globals.api.isLoged();
    this.list_id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.id = parseInt(this.route.snapshot.paramMap.get('detail_id'));

    this.presentLoading();

    this.filter.id = this.id;

    this.getUserId();
    this.getBrbShop();   
    this.getWorkers();
    this.getServices();
  }

  call() {
    this.callNumber.callNumber(this.phone, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  cancel() {    
    this.confirmed = false;
    this.wrk_id = null;
    this.refresh(); 
  }

  editComment() {
    this.edit_comment = true;    
  }

  getBrbShop() {
    Globals.api.getHairdressing(this.filter, (list, error) => {
      if(list != null) {
        this.barbershop = list;
        console.log(this.barbershop)
      } else {
        console.log(error)
      }

      this.initBrb();

      this.getComments();       
    });    
  }

  getComments() {
    Globals.api.getComments(this.barbershop[0].id, (comment, msg) => {
      this.comments = comment;      
      this.comments.forEach(com => {  
        if(com.user == this.user_id) {
          this.already_com = true;
          this.subject = com.subject;
          this.comment_text = com.comment;
          this.rate = com.rate.stars;
          switch(this.rate) {
            case 5:
              var text;
              this.trans.get('PAGES.BRBDETAILS.EXCELLENT').subscribe(async (res: string) => {
                text=res;
              });
              this.rate_placeholder = text;
            break;
            case 4:
              var text;
              this.trans.get('PAGES.BRBDETAILS.SO_GOOD').subscribe(async (res: string) => {
                text=res;
              });
              this.rate_placeholder = text;
            break;
            case 3:
              var text;
              this.trans.get('PAGES.BRBDETAILS.NOT_BAD').subscribe(async (res: string) => {
                text=res;
              });
              this.rate_placeholder = text;
            break;
            case 2:
              var text;
              this.trans.get('PAGES.BRBDETAILS.SO_BAD').subscribe(async (res: string) => {
                text=res;
              });
              this.rate_placeholder = text;
            break;
            case 1:
              var text;
              this.trans.get('PAGES.BRBDETAILS.HORRIBLE').subscribe(async (res: string) => {
                text=res;
              });
              this.rate_placeholder = text;
            break;
          }
        }

        Globals.api.getProfile(com.user, (profile, msg) => {
          this.coms.push({comment: com, name: profile.name + " " + profile.surname, avatar: profile.avatar})
        });
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

  getUserId() {
    if(Globals.api.currentUser != null) {
      this.user_id = Globals.api.currentUser.id;
    }    
  }

  getWorkers() {
    Globals.api.getHairdressers(this.id, (hairdressers, msg) => {
      console.log(hairdressers)
      this.workers = hairdressers;      
    });         
  }

  goToLogin() {
    this.router.navigate(["/tabs/login"]);
  }

  initBrb() {
    this.slider = this.barbershop[0].imglist;      
    this.tb_image = this.slider[0];
    this.style = "--background: linear-gradient(162deg, transparent 20%, rgba(56, 70, 108, .8) 100%), url('"+this.url+this.tb_image+"') center no-repeat; filter: blur(5px); -webkit-filter:blur(5px); min-height: 75px; color: white;";
    this.style = this.domController.bypassSecurityTrustStyle(this.style);
    this.name = this.barbershop[0].name;   
    this.address = this.barbershop[0].address;
    this.phone = this.barbershop[0].tlf;
    this.email = this.barbershop[0].email;
    this.desc = this.barbershop[0].desc;
    this.brb_rating = this.barbershop[0].rate.stars;
    this.total_rate = this.barbershop[0].rate.total;
  }

  async pay() {
    const myModal = await this.modalController.create({
      component: PayComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: { wrk_id: this.wrk_id, wrk_name: this.wrk_name, hour: this.myHour, date: this.myDate,  paid: 1, services: this.snames,
      price: this.price, service_ids: this.service_ids } 
    });

    myModal.onDidDismiss().then((data) => {
      if(typeof data.data !== undefined && data.data != undefined) {
        if(data.data.paid) {
          var text;
          this.trans.get('PAGES.BRBDETAILS.RESERVATION_DONE').subscribe(async (res: string) => {
            text=res;
          });
          this.presentToast(text);
        } else {
          var text;
          this.trans.get('PAGES.BRBDETAILS.ERROR_IN_RESERVATION').subscribe(async (res: string) => {
            text=res;
          });
          this.presentToast(text);
        }
      }
      this.cancel();
    });

    return await myModal.present();
  }

  async presentLoading() {
    var text;
    await this.trans.get('PAGES.BRBDETAILS.LOADING_HAIRDRESSER').subscribe(async (res: string) => {
      text=res;
    });
    const loading = await this.loadingController.create({
      duration: 1000,
      message: text
    });
    await loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
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
      } else {
        this.refresh();
      }     
    });

    return await myModal.present();
  }  

  sendComment() {
    if(typeof this.subject === undefined || this.subject == undefined || typeof this.comment_text === undefined
      || this.comment_text == undefined || typeof this.rate === undefined || this.rate == undefined) {
        var text;
        this.trans.get('PAGES.BRBDETAILS.FILL_FIELDS').subscribe(async (res: string) => {
          text=res;
        });
        this.presentToast(text);
    } else {
      this.comment = {hairdressing: this.id, subject: this.subject, comment: this.comment, rate: this.rate};
      Globals.api.comment(this.comment, (msg) => {
        console.log(msg)
        this.already_com = true;
        this.edit_comment = false;
      });

      this.refresh();
    } 
  }

  async sendEmail() {
    const myModal = await this.modalController.create({
      component: EmailComponent,
      cssClass: 'email-css',
      componentProps: { email: this.email }
    });

    return await myModal.present();
  }

  showData() {
    if(this.showD) {
      this.showD = false;
    } else {
      this.showD = true;
    }
  }

  async showImage(event) {
    let img = event.srcElement.currentSrc;
    const modal = await this.modalController.create({
      component: GalleryComponent,
      cssClass: 'custom-gallery-component',
      componentProps: { img: img, name: this.name }
    });

    return await modal.present();
  }

  async showInfo(com: any) {
    const modal = await this.modalController.create({
      component: InfoComponent,
      cssClass: 'info-component',
      componentProps: { avatar: com.avatar, name: com.name }
    });

    return await modal.present();
  }

  showLocation() {
    //let destination = [this.filter.lat, this.filter.lng];
    this.launchNavigator.navigate(this.address, this.options)
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
