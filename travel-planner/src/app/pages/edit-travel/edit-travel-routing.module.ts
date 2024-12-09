import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTravelPage } from './edit-travel.page';

const routes: Routes = [
  {
    path: '',
    component: EditTravelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTravelPageRoutingModule {}
