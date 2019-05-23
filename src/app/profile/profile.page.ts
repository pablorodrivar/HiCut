import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private globals;
  public list_id;
  public id: number;
  public name: string;
  public surname: string;
  public city: string;
  public country: string;
  public address: string;
  public email: string;
  public phone: string;
  public avatar: string;
  public edited: boolean = false;
  public url: string;
  public raw_brb_shops: any[] = [];
  public brbshops: [{id, img}];

  constructor(private route:ActivatedRoute,private router: Router, private alertController: AlertController, public modalController: ModalController) {
    this.globals = Globals;
    this.url = Globals.url;
  }

  ngOnInit() {
    this.list_id = this.route.snapshot.paramMap.get('id');
    
    if(!this.edited) {
      this.getProfile();
    }   
    this.getBrbShops(); 
  }   

  getBrbShops() {
    Globals.api.getListReservations((list, msg) => {
      list.forEach(element => {
        Globals.api.reservation(element.id, (status, msg) => {
          let values = Object.values(status);
          this.raw_brb_shops.push(values[10]);
        });        
      });

      console.log(this.raw_brb_shops)

      let repeat: number[] = [];
      this.raw_brb_shops.forEach(val => {      
        console.log(val.id) 
        if(!repeat.includes(val.id)) {
          repeat.push(val.id);
          this.brbshops.push({ id: val.id, img: val.id });
        }
      });

      console.log(this.brbshops)
    });
  }

  getProfile() {
    Globals.api.getProfile(null,(profile, msg) => {
      this.name = profile.name;
      this.surname = profile.surname;
      this.city = profile.city;
      this.country = profile.country;
      this.address = profile.address;
      this.phone = profile.phone;
      this.email = profile.email;
      this.id = profile.id;
      this.avatar = profile.avatar;
    });
  }

  logout() {
    Globals.api.doLogout();
    this.router.navigate(["/tabs/login"]);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: EditComponent,
      componentProps: { id: this.id, name: this.name, surname: this.surname, city: this.city, country: this.country, address: this.address,
      phone: this.phone, email: this.email, avatar: this.avatar }
    });

    modal.onDidDismiss().then((data) => {
      if(data.data){
        if(typeof data.data[0].name !== undefined && data.data[0].name != undefined && typeof data.data[0].surname !== undefined && data.data[0].surname != undefined
          && typeof data.data[0].country !== undefined && data.data[0].country != undefined && typeof data.data[0].city !== undefined && data.data[0].city != undefined
          && typeof data.data[0].address !== undefined && data.data[0].address != undefined && typeof data.data[0].phone !== undefined && data.data[0].phone != undefined) {     
            this.edited = true;
            this.name = data.data[0].name;
            this.surname = data.data[0].surname;
            this.city = data.data[0].city;
            this.country = data.data[0].country;
            this.address = data.data[0].address;
            this.phone = data.data[0].phone;
            this.avatar = data.data[0].avatar;
        }
  
        this.refresh();
      }      
    })

    return await modal.present();
  }

  refresh() {
    setTimeout(() => {
      this.ngOnInit();
    }, 1000);
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesion',
      message: 'Seguro que quiere cerrar sesion?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'SI',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  toDetail(detail_id) {
    this.router.navigate(["/tabs/home/list/"+this.list_id+"/detail",detail_id]);
  }

  toEdit() {
    this.router.navigate(["/edit-profile"]);
  }    
}
