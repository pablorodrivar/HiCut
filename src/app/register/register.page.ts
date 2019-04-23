import { Component, OnInit } from '@angular/core';
import { Filter } from 'classes/pojo/filter';
import { Globals } from '../app.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor() { }

  ngOnInit() {
    var filter = new Filter();
    filter.lat = -51.460028;
    filter.lng = -15.794104;
    //filter.genre = 1;
    Globals.api.getHairdressing(filter,(list,error)=>{
      if (list!=null){
        console.log(list);
      }
      else{
        console.log(error);
      }
    });
  }

}
