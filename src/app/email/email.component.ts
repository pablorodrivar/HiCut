import { Component, OnInit, Input } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  @Input("email") email;
  public subject: string;
  public body: string;

  constructor(private emailComposer: EmailComposer, private modalController: ModalController, public toastController: ToastController) { }

  ngOnInit() {}

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
        this.presentToast('Email sent')
        this.modalController.dismiss();
    } else {
      this.presentToast('Fill all the fields');
    }
  }

}
