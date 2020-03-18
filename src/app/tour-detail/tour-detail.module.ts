import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core'
import { IonicModule } from '@ionic/angular';

import { TourDetailPageRoutingModule } from './tour-detail-routing.module';

import { TourDetailPage } from './tour-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    TourDetailPageRoutingModule
  ],
  declarations: [TourDetailPage]
})
export class TourDetailPageModule {}
