import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service'; // Serviço de API
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-travel',
  templateUrl: './create-travel.page.html',
  styleUrls: ['./create-travel.page.scss'],
  standalone:false
})
export class CreateTravelPage {
  travelForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.travelForm = this.fb.group({
      description: ['', Validators.required],
      type: ['', Validators.required],
      state: ['', Validators.required],
      startAt: ['', Validators.required],
      endAt: ['', Validators.required],
      createdBy: [''],  // Substituir com usuário autenticado, se aplicável
      prop1: [''],      // Campo personalizado
      prop2: [''],      // Campo personalizado
      prop3: [''],      // Campo personalizado
      isFav: [false],   // Exemplo de campo booleano
    });
  }

  async onSubmit() {
    if (this.travelForm.valid) {
      const loading = await this.showLoading('Criando viagem...');
      try {
        const travelData = this.travelForm.value;
        travelData.startAt = travelData.startAt ? new Date(travelData.startAt) : null;
        travelData.endAt = travelData.endAt ? new Date(travelData.endAt) : null;

        const response = await firstValueFrom(this.apiService.createTravel(travelData));
        console.log('Viagem criada:', response);
        loading.dismiss();
        await this.presentToast('Viagem criada com sucesso 🚀', 'success');
        this.router.navigate(['/home.page']);
      } catch (error) {
        console.error('Erro ao criar viagem:', error);
        loading.dismiss();
        await this.presentToast('Erro ao criar viagem 😥', 'danger');
      }
    }
  }

  private async showLoading(message: string): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      message,
      spinner: 'crescent',
    });
    await loading.present();
    return loading;
  }

  private async presentToast(message: string, color: 'success' | 'danger' | 'warning'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }
}
