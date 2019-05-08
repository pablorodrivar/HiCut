import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalComponent } from '../modal-component/modal-component.component';
import { ModalController } from '@ionic/angular';
import { Globals } from '../globals';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Filter } from '../../classes/pojo/filter';
import { LoadingController } from '@ionic/angular';

/*
  PARA VER COMO PASAR DATOS ENTRE MODAL Y LA LISTA: https://ionicframework.com/docs/api/modal
*/

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

  constructor(private route:ActivatedRoute, private router: Router, 
    public alertController: AlertController, public modalController: ModalController,
    public geolocation: Geolocation, public loadingController: LoadingController) { 
    this.globals = Globals;    
    this.filter.lat = 37.183054;
    this.filter.lng = -3.6021928;
    this.mdChipText = 20+"";
  }

  ngOnInit() {
    this.locChipText = "";
    this.list = [];
    this.distances = [];
    this.brbshops = [];
    this.presentLoading();
    this.list_id = this.route.snapshot.paramMap.get('id');    
    this.filter.genre = this.list_id;   
    
    //DEPURANDO CON EL DEVICE FISICO
    /*this.geolocation.getCurrentPosition().then(loc => {
      this.filter.lat = loc.coords.latitude;
      this.filter.lng = loc.coords.longitude;
    });*/

    /*this.getLocation(this.filter.lat, this.filter.lng).then(val => {
      console.log(val)
    });*/

    this.getLocation(this.filter.lat, this.filter.lng).then(data => {
      this.locChipText = data.results[0].components.city;
    });

    Globals.api.getHairdressing(this.filter, (list, error) => {
      if(list != null) {        
        this.list = list;
        this.locChipText = this.list[0]
      } else {
        console.log(error)
      }

      this.list.forEach(val => {
        this.distances.push(this.distance(val.lat, val.lng, this.filter.lat, this.filter.lng, "K"));
      });

      this.list.forEach(val => {
        Globals.api.getRating(val.id, (rate, error) => {
          this.ratings.push(rate.stars);
        });
      });

      for(var _i = 0; _i < this.list.length; _i++) {
        this.brbshops.push({
          brb: this.list[_i],
          dist: this.distances[_i],
          rate: this.ratings[_i]
        });
      }      

      this.sort(this.brbshops, "dist", true, (brbs, error) => {
        this.brbshops = brbs;
      });
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

  toDetail(detail_id) {
    this.router.navigate(["/tabs/home/list/"+this.list_id+"/detail",detail_id]);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: { id: this.list_id }
    });

    modal.onDidDismiss().then((data) => {
      console.log(data.data[0])
      if(typeof data.data[0] !== undefined || data.data[0] !== undefined) {
        this.filter.text = data.data[0];
        if(this.filter.text != "") {
          this.locationChip = true;
          this.locChipText = this.filter.text;
        } else {
          this.locationChip = false;
        }
      }

      if(typeof data.data[1] !== undefined || data.data[1] != undefined) {
        this.filter.max_km = data.data[1];
        if(this.filter.max_km > 20) {
          this.maxDistChip = true;
          this.mdChipText = this.filter.max_km + "";
        } else {
          this.maxDistChip = false;
        }        
      }

      this.refresh();
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
    //let url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&sensor=false";
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
      console.log("ON PROGRESS")
    }

    if(!asc) {
      callback(array.reverse(), "Error");
    } else {
      callback(array, "Error");
    }
  }
}
