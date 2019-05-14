import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalComponent } from '../modal-component/modal-component.component';
import { ModalController } from '@ionic/angular';
import { Globals } from '../globals';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Filter } from '../../classes/pojo/filter';
import { LoadingController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})

export class ListPage implements OnInit {
  private globals;
  public list_id; 
  public searchText = '';
  public list: any[] = [];
  public filter = new Filter();
  public maxDistChip: boolean = false;
  public locationChip: boolean = false;
  public mdChipText: string;
  public locChipText: string;
  public distances: any[] = [];
  public brbshops: any[] = [];
  public ratings: any[] = [];
  public sort_opt: string;
  public services: any[] = [];
  public services_names:string;

  constructor(private route:ActivatedRoute, private router: Router, 
    public alertController: AlertController, public modalController: ModalController,
    public geolocation: Geolocation, public loadingController: LoadingController, public androidPermissions: AndroidPermissions) { 
    this.globals = Globals;    
    this.filter.lat = 37.183054;
    this.filter.lng = -3.6021928;
    this.mdChipText = 20+"";
    this.sort_opt = "dist";    
  }

  checkPermissions() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.LOCATION).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermissions(this.androidPermissions.PERMISSION.LOCATION)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.LOCATION, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
  }

  ngOnInit() {
    //DEVICE FISICO
   // this.checkPermissions();
    this.locChipText = "";
    this.list = [];
    this.distances = [];
    this.brbshops = [];
    this.ratings = [];
    this.presentLoading();
    this.list_id = this.route.snapshot.paramMap.get('id');    
    this.filter.genre = this.list_id;   
    
    //CUANDO USEMOS EL DEVICE FISICO
    //this.getGeoLocation();  

    this.getBrb();
  }

  getGeoLocation() {
    this.geolocation.getCurrentPosition().then(loc => {
      this.filter.lat = loc.coords.latitude;
      this.filter.lng = loc.coords.longitude;
    });   
  }

  getBrb() {
    Globals.api.getHairdressing(this.filter, (list, error) => {
      if(list != null) {        
        this.list = list;
        this.locChipText = this.list[0]
      } else {
        console.log(error)
      }

      this.getLocation(this.filter.lat, this.filter.lng).then(data => {
        if(typeof data.results !== undefined && data.results != undefined) {
          this.locChipText = data.results[0].components.city;
        }        
      });

      this.list.forEach(val => {
        Globals.api.getRating(val.id, (rate, error) => {
          this.ratings.push(rate);          
        });
      });

      this.list.forEach(val => {
        this.distances.push(this.distance(val.lat, val.lng, this.filter.lat, this.filter.lng, "K"));
      });     

      this.merge(this.sort_opt, true);      
      
      console.log(this.brbshops)
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.list = [];
      this.ngOnInit();
      event.target.complete();
    }, 1000);
  }

  refresh() {
    setTimeout(() => {
      this.list = [];
      this.ngOnInit();
    }, 1000);
  }

  merge(opt: string, asc: boolean) {
    setTimeout(() => {
      for(var _i = 0; _i < this.list.length; _i++) {
        this.brbshops.push({
          brb: this.list[_i],
          dist: this.distances[_i],
          rate: this.ratings[_i]
        });
      }

      this.sort(this.brbshops, opt, asc, (brbs, error) => {
        this.brbshops = brbs;
      });
    }, 1000);
  }

  toDetail(detail_id) {
    this.router.navigate(["/tabs/home/list/"+this.list_id+"/detail", detail_id]);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
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
  
        this.refresh();
      }      
    })

    return await modal.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 1000
    });
    await loading.present();
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
        return item1.dist - item2.dist;
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
        if(item1.brb.name > item2.brb.name) {
          return 1;
        }
        if(item1.brb.name < item2.brb.name) {
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
