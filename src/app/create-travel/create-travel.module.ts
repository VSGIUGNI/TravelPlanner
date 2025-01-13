import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';  // Certifique-se de importar isso
import { CommonModule } from '@angular/common';
import { CreateTravelPage } from './create-travel.page';
import { CreateTravelPageRoutingModule } from './create-travel-routing.module';

@NgModule({
  declarations: [CreateTravelPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,  // Adicione aqui se estiver faltando
    CreateTravelPageRoutingModule
  ],
})
export class CreateTravelPageModule {}
