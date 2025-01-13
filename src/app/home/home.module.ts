import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Adicionando ReactiveFormsModule para formulários reativos
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { NoteDetailsComponent } from '../note-details/note-details.component'; // Importando o componente de detalhes da nota

@NgModule({
  imports: [
    CommonModule, // Fornece diretivas básicas como ngIf e ngFor
    FormsModule, // Necessário para formulários baseados em template
    ReactiveFormsModule, // Necessário para formulários baseados em reatividade
    IonicModule, // Fornece componentes do Ionic
    HomePageRoutingModule // Configuração de rotas da página inicial
  ],
  declarations: [
    HomePage, // Declara o componente principal da página inicial
    NoteDetailsComponent // Declara o componente de detalhes da nota (necessário para usá-lo na HomePage)
  ],
  exports: [
    HomePage, // Exporta HomePage para ser utilizado em outros módulos, caso necessário
    NoteDetailsComponent // Exportando também o NoteDetailsComponent, caso precise ser reutilizado em outros módulos
  ]
})
export class HomePageModule {}
