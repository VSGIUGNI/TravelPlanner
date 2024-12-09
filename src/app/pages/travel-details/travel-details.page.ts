import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.page.html',
  styleUrls: ['./travel-details.page.scss'],
})
export class TravelDetailsPage implements OnInit {
  travelId: string | null = null;
  travel: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  async ngOnInit() {
    this.travelId = this.route.snapshot.paramMap.get('id');
    if (this.travelId) {
      this.travel = await this.apiService.getTravelById(this.travelId);
    }
  }
}
