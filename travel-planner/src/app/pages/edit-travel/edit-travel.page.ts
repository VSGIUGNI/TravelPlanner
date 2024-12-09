import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-edit-travel',
  templateUrl: './edit-travel.page.html',
  styleUrls: ['./edit-travel.page.scss'],
})
export class EditTravelPage implements OnInit {
  travelForm: FormGroup;
  travelId: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.travelForm = this.fb.group({
      description: ['', Validators.required],
      type: ['', Validators.required],
      state: ['', Validators.required],
      startAt: ['', Validators.required],
      endAt: ['', Validators.required]
    });
    this.travelId = this.route.snapshot.paramMap.get('id') || '';
  }

  async ngOnInit() {
    if (this.travelId) {
      const travel = await this.apiService.getTravelById(this.travelId);
      this.travelForm.patchValue(travel); // Preenche o formulário com os dados existentes
    }
  }

  async onSubmit() {
    if (this.travelForm.valid) {
      try {
        await this.apiService.updateTravel(this.travelId, this.travelForm.value);
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Erro ao atualizar viagem:', error);
      }
    }
  }
}
