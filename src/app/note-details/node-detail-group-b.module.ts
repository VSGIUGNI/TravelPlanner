import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NoteDetailsGroupBComponent } from './note-details-group-b.component';

@NgModule({
  declarations: [NoteDetailsGroupBComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [NoteDetailsGroupBComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permite componentes desconhecidos
})
export class NoteDetailsGroupBModule {}
