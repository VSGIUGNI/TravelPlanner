import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.page.html',
  styleUrls: ['./opinions.page.scss'],
})
export class OpinionsPage implements OnInit {
  opinions: any[] = [];
  newOpinion: string = '';
  editMode: boolean = false;
  opinionToEdit: any = null;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    await this.loadOpinions();
  }

  // Carregar opiniões
  async loadOpinions() {
    try {
      this.opinions = await this.apiService.getOpinions();
    } catch (error) {
      console.error('Erro ao carregar opiniões:', error);
    }
  }

  // Adicionar uma nova opinião
  async addOpinion() {
    if (this.newOpinion.trim()) {
      try {
        const opinion = await this.apiService.createOpinion(this.newOpinion);
        this.opinions.push(opinion);
        this.newOpinion = '';
      } catch (error) {
        console.error('Erro ao adicionar opinião:', error);
      }
    }
  }

  // Entrar no modo de edição
  editOpinion(opinion: any) {
    this.editMode = true;
    this.opinionToEdit = { ...opinion };
  }

  // Salvar a opinião editada
  async saveOpinion() {
    try {
      const updatedOpinion = await this.apiService.updateOpinion(this.opinionToEdit.id, this.opinionToEdit.comment);
      const index = this.opinions.findIndex(op => op.id === updatedOpinion.id);
      if (index !== -1) this.opinions[index] = updatedOpinion;

      this.editMode = false;
      this.opinionToEdit = null;
    } catch (error) {
      console.error('Erro ao salvar opinião:', error);
    }
  }

  // Excluir uma opinião
  async deleteOpinion(id: string) {
    try {
      await this.apiService.deleteOpinion(id);
      this.opinions = this.opinions.filter(opinion => opinion.id !== id);
    } catch (error) {
      console.error('Erro ao excluir opinião:', error);
    }
  }
}
