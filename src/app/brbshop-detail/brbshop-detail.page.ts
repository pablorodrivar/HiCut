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
  //public events:any;
  constructor(private datePicker: DatePicker, private launchNavigator: LaunchNavigator, private route:ActivatedRoute,private router: Router,
    public alertController: AlertController, public loadingController: LoadingController, public toastController: ToastController,) { }

  options: LaunchNavigatorOptions = {
    start: 'Spain, ON'
  }

  dayNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",];  

  ngOnInit() {    
    this.comments = [];
    this.is_loged = Globals.api.isLoged();
    this.list_id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.id = parseInt(this.route.snapshot.paramMap.get('detail_id'));

    this.presentLoading();

    console.log("LISTA: "+this.list_id+" BARBERIA: "+this.id);

    this.filter.id = this.id;

    this.getBrbShop();   
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
        console.log(list)
        this.barbershop = list;
      } else {
        console.log(error)
      }
    
      this.slider = this.barbershop[0].imglist;
      this.name = this.barbershop[0].name;

      Globals.api.getComments(this.barbershop[0].id, (comment, msg) => {
        console.log(comment)
        this.comments = comment;        
      });      

      Globals.api.getRating(this.id, (rate, error) => {
        console.log(rate)
        this.brb_rating = rate.stars;
        this.total_rate = rate.total;
      });
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
