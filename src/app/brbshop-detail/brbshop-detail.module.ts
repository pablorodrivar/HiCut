import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MbscModule } from '@mobiscroll/angular';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { BrbshopDetailPage } from './brbshop-detail.page';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { PayComponent } from '../pay/pay.component';

// Configuración de traducción
import { customTranslateLoader } from '../app.module';

const routes: Routes = [
  {
    path: '',
    component: BrbshopDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MbscModule,
    IonicModule,
    HttpModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild(routes)
  ],
  entryComponents: [PayComponent],
  declarations: [BrbshopDetailPage, PayComponent],
  providers: [PayComponent]
})
export class BrbshopDetailPageModule {}
