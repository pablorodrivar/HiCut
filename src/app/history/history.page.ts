import { Component } from '@angular/core';
import { Reservation } from '../../classes/pojo/reservation';

@Component({
  selector: 'app-history',
  templateUrl: 'history.page.html',
  styleUrls: ['history.page.scss']
})



export class HistoryPage {

  public history_list:Reservation[];

  goToHistoryDetail(event, item){

  }
}
