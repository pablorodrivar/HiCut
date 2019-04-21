import { Component } from '@angular/core';
import { Reservation } from '../../classes/pojo/reservation';
import { Router } from '@angular/router';
import { Globals } from 'app/app.module';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})



export class HistoryPage {
  public history_list:Reservation[];

  constructor(private router:Router){
    Globals.api.getListReservations((list,msg)=>{
      console.log(list);
      console.log(msg);
    });
  }

  goToHistoryDetail(event, item){
    this.router.navigate(["/tabs/history/history_detail/1"]);
  }
}
