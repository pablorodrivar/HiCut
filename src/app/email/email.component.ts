import { Component, OnInit, Input } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ModalController, ToastController } from '@ionic/angular';
import { Globals } from 'app/globals';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  @Input("email") email;
  public subject: string;
  public body: string;
  public isLoged: boolean;

  constructor(private emailComposer: EmailComposer, private modalController: ModalController, public toastController: ToastController,
    public router: Router, public trans: TranslateService) { }

  ngOnInit() {
    this.isLoged = Globals.api.isLoged();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  toLogin() {
    this.router.navigate(["/tabs/login"]);
    this.modalController.dismiss();
  }

  send() {
    let email = {
      to: this.email,
      subject: this.subject,
      body: this.body,
      isHtml: true
    }

    if(this.email != undefined && typeof this.email !== undefined &&
      this.subject != undefined && typeof this.subject !== undefined &&
      this.body != undefined && typeof this.body !== undefined) {
        this.emailComposer.open(email);
        var text;
        this.trans.get('PAGES.EMAIL.EMAIL_SENT').subscribe(async (res: string) => {
          text=res;
        });
        this.presentToast(text)
        this.modalController.dismiss();
    } else {
      var text;
      this.trans.get('PAGES.EMAIL.FILL_FIELDS').subscribe(async (res: string) => {
        text=res;
      });
      this.presentToast(text);
    }
  }

}
