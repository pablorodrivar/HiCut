import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Globals } from '../app.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private globals;
  public list_id;
  constructor(private route:ActivatedRoute,private router: Router) {
    this.globals = Globals;
  }

  ngOnInit() {
    this.list_id=this.route.snapshot.paramMap.get('id');
  }

  toDetail(detail_id) {
    this.router.navigate(["/tabs/home/list/"+this.list_id+"/detail",detail_id]);
  }

  toEdit() {
    this.router.navigate(["/tabs/edit-profile"]);
  }

  logout() {
    Globals.api.doLogout();
    this.router.navigate(["/tabs/login"]);
  }
}
