import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule para suporte a formulários reativos
import { DetailPage } from './detail.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPage, // Configura a página de detalhes
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Inclui suporte a formulários reativos
    IonicModule,
    RouterModule.forChild(routes), // Configura o roteamento para a página de detalhes
  ],
  declarations: [DetailPage], // Declara o componente DetailPage no módulo
})
export class DetailPageModule {}
