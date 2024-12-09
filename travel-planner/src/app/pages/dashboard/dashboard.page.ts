import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  travels: any[] = []; // Lista de viagens

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    await this.loadTravels();
  }

  async loadTravels() {
    try {
      this.travels = await this.apiService.getTravels(); // Chama a API para obter as viagens
    } catch (error) {
      console.error('Erro ao carregar viagens:', error);
    }
  }
  
  searchText: string = '';

filterTravels() {
  return this.travels.filter(travel =>
    travel.description.toLowerCase().includes(this.searchText.toLowerCase())
  );
}
  navigateToCreate() {
    // Navegar para o formulário de criação
  }
}
