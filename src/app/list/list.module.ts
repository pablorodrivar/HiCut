import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MbscModule } from '@mobiscroll/angular';
import { ModalComponent } from '../modal-component/modal-component.component';

import { IonicModule } from '@ionic/angular';

import { ListPage } from './list.page';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// Configuración de traducción
import { customTranslateLoader, AppModule } from '../app.module';
import { PipesModule } from 'app/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: ListPage
  }
];

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    MbscModule,
    IonicModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild(routes),
    InfiniteScrollModule
  ],
  declarations: [ListPage, ModalComponent],
  entryComponents: [ModalComponent]
})
export class ListPageModule {}
