import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage, 
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes) // Configura o roteamento para o módulo da página inicial
  ],
  exports: [
    RouterModule // Torna o roteamento acessível a outros módulos
  ]
})
export class HomePageRoutingModule {}
