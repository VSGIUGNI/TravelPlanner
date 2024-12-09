import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  comments: any[] = [];
  travelId!: string;
  newComment! : string;

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    // Aqui, você pode pegar o ID da viagem de algum lugar, como das rotas
    this.travelId = '1'; // exemplo fixo, substitua conforme necessário
    await this.loadComments();
  }

  // Carregar os comentários
  async loadComments() {
    try {
      this.comments = await this.apiService.getCommentsByTravelId(this.travelId);
    } catch (error) {
      console.error('Erro ao carregar comentários:', error);
    }
  }

  // Criar um novo comentário
  async addComment(comment: string) {
    try {
      await this.apiService.createComment(this.travelId, comment);
      this.comments.push({ comment, createdAt: new Date() }); // Adiciona o comentário localmente
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  }
}
