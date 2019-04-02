import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalComponent } from '../modal-component/modal-component.component';
import { ModalController } from '@ionic/angular';
import { Globals } from '../app.module';

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

  constructor(private route:ActivatedRoute, private router: Router, public alertController: AlertController, public modalController: ModalController) { 
    this.globals = Globals;
  }

  ngOnInit() {
    this.list_id=this.route.snapshot.paramMap.get('id');    
    console.log(this.list_id);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  toDetail(detail_id) {
    this.router.navigate(["/tabs/home/list/"+this.list_id+"/detail",detail_id]);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
}
