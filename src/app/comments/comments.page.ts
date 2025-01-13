import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';  // Certifique-se de ajustar o caminho correto

@Component({
    selector: 'app-comments',
    templateUrl: './comments.page.html',
    styleUrls: ['./comments.page.scss'],
    standalone: false
})
export class CommentsPage implements OnInit {
  comments: any[] = [];
  travelId!: string;
  newComment!: string;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.travelId = this.route.snapshot.paramMap.get('id') || '';
    console.log('ID da viagem atual:', this.travelId);
    await this.loadComments();
  }

  async loadComments() {
    try {
      const travel = await this.apiService.getTravelById(this.travelId).toPromise();
      this.comments = travel.comments || [];
    } catch (error) {
      console.error('Erro ao carregar comentários:', error);
    }
  }

  async createComment() {
    if (this.newComment.trim()) {
      try {
        const commentData = { travelId: this.travelId, comment: this.newComment };
        const newComment = await this.apiService.createTravelComment(commentData).toPromise();
        this.comments.push(newComment);
        this.newComment = '';
      } catch (error) {
        console.error('Erro ao criar comentário:', error);
      }
    }
  }
}
