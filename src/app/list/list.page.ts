import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ModalComponent } from '../modal-component/modal-component.component';
import { ModalController } from '@ionic/angular';
import { Globals } from '../globals';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Filter } from '../../classes/pojo/filter';
import { LoadingController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ApiController } from 'classes/api.controller';
import { delay } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})

export class ListPage {

  private globals;
  private viewLoaded;

  public list_id; 
  public searchText = '';
  public list: any[] = [];
  public filter = new Filter();
  public maxDistChip: boolean = false;
  public locationChip: boolean = false;
  public mdChipText: string;
  public locChipText: string;
  public sort_opt: string;
  public services: any[] = [];
  public services_names:string;
  public url: string;

  constructor(private route:ActivatedRoute, private router: Router, 
    public alertController: AlertController, public modalController: ModalController,public trans: TranslateService,
    public geolocation: Geolocation, public loadingController: LoadingController, public androidPermissions: AndroidPermissions,public toastController: ToastController) { 
    this.globals = Globals;    
    this.filter.lat = 37.183054;
    this.filter.lng = -3.6021928;
    this.mdChipText = 20+"";
    this.sort_opt = "dist";  
    this.url = ApiController.api_url;  
  }

  checkPermissions() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.LOCATION).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermissions(this.androidPermissions.PERMISSION.LOCATION)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.LOCATION, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
  }

  ionViewWillEnter(){
    this.viewLoaded=false;
    this.locChipText = "";
    this.list = [];
    this.list_id = this.route.snapshot.paramMap.get('id');
    if (this.list_id===undefined || this.list_id === null){//evitamos bugazon de ionic
      this.router.navigate(["/tabs/home/"]);
    }
    this.filter.genre = +this.list_id;   
    
    //CUANDO USEMOS EL DEVICE FISICO
    //this.getGeoLocation();  

    this.loadBrb();
  }

  getGeoLocation() {
    //this.geolocation.getCurrentPosition().then(loc => {
      //this.filter.lat = loc.coords.latitude;
      //this.filter.lng = loc.coords.longitude;
    //});   
  }

  async loadBrb() {
    var text;
    await this.trans.get('PAGES.LIST.LOADING_HAIRDRESSING').subscribe(async (res: string) => {
      text=res;
    });
    const loading = await this.loadingController.create({
      message: text
    });
    await loading.present();

    Globals.api.getHairdressing(this.filter, async (list, error) => {
      
      
      if(list !== null) { 
        console.log(list)       
        this.list = list;
        this.locChipText = this.list[0]


        for (let index = 0; index < list.length; index++) {
          const element = list[index];
          Globals.api.getRating(element.id,  (rate, error) => {
            element['rate']=rate;
          });
          element['distance']=this.distance(element.lat, element.lng, this.filter.lat, this.filter.lng, "K");
        }

        this.sort(this.list, this.sort_opt, true, (brbs, error) => {
          this.list = brbs;
          this.viewLoaded=true;
          loading.dismiss();
        });
      } else {
        loading.dismiss();
        console.log(error)
        this.presentToast(error);
        return;
      }
    });
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }
  doRefresh(event) {
    setTimeout(() => {
      this.list = [];
      this.ionViewWillEnter();
      if (event!==null){
        event.target.complete();
      }
    }, 1000);
  }

  toDetail(detail_id) {
    this.router.navigate(["/tabs/home/list/"+this.list_id+"/detail", detail_id]);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'sort-options',
      componentProps: { id: this.list_id }
    });

    modal.onDidDismiss().then((data) => {
      if(data.data){
        if(typeof data.data[0].distance !== undefined && data.data[0].distance != undefined) {
          this.filter.max_km = data.data[0].distance;
          if(this.filter.max_km > 20) {
            this.maxDistChip = true;
            this.mdChipText = this.filter.max_km + "";
          } else {
            this.maxDistChip = false;
          }        
        }
  
        if(typeof data.data[0].sort_opt !== undefined && data.data[0].sort_opt != undefined) {
          this.sort_opt = data.data[0].sort_opt;        
        }

        if(typeof data.data[0].services !== undefined && data.data[0].services != undefined) {
          this.services = data.data[0].services;    
          this.services_names = this.services.join(", ");    
        }
  
        this.doRefresh(null);
      }      
    })

    return await modal.present();
  }

  searchBrb(event) {    
    const text = event.target.value;
    this.searchText= text;
  }

  async getLocation(lat: any, long: any) {
    let url = "https://api.opencagedata.com/geocode/v1/json?q="+lat+"+"+long+"&key=497316bc880f4aafb1357e3185e95d01";
    // START FETCH
    return fetch(url, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return res;
      }
    }).catch(err => err);
    // END FETCH
  }  

  distance(lat1: number, lon1: number, lat2: number, lon2: number, unit: string) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      let radlat1 = Math.PI * lat1/180;
      let radlat2 = Math.PI * lat2/180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta/180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if(dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      let res: string = dist + "";
      res = res.substring(0,4);
      return res;
    }
  }

  sort(array: any[], opt: string, asc: boolean, callback: (array, error) => any) {
    if(opt == "dist") {   
      array = array.sort((item1, item2) => {
        return item1.distance - item2.distance;
      });  
    } else if (opt == "rat") {
      array = array.sort((item1, item2) => {
        let rate = item1.rate.stars - item2.rate.stars;
        if(rate > 0) {
          return -1;
        } else if(rate < 0) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (opt == "alp") {
      array = array.sort((item1, item2) => {
        if(item1.name > item2.name) {
          return 1;
        }
        if(item1.name < item2.name) {
          return -1;
        }
        return 0;
      });
    }

    if(!asc) {
      callback(array.reverse(), "Error");
    } else {
      callback(array, "Error");
    }
  }
}
