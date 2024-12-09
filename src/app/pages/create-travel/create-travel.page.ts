import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-travel',
  templateUrl: './create-travel.page.html',
  styleUrls: ['./create-travel.page.scss'],
})
export class CreateTravelPage {
  travelForm: FormGroup;

  constructor(
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
  }

  async onSubmit() {
    if (this.travelForm.valid) {
      try {
        await this.apiService.createTravel(this.travelForm.value);
        this.router.navigate(['/dashboard']);
      } catch (error) {
        console.error('Erro ao criar viagem:', error);
      }
    }
  }
}
