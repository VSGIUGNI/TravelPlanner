import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpinionsPageRoutingModule } from './opinions-routing.module';

import { OpinionsPage } from './opinions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpinionsPageRoutingModule
  ],
  declarations: [OpinionsPage]
})
export class OpinionsPageModule {}
