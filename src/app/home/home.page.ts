import { Component } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { NoteDetailsComponent } from '../note-details/note-details.component';
import { ApiService } from '../api.service';

interface Note {
  id: string;
  description: string;
  type: string;
  state: string;
  map: string;
  startAt: Date;
  endAt: Date;
  createdby: string;
  createdate: Date;
  prop1: string;
  prop2: string;
  prop3: string;
  isfav: boolean;
  locations: string;
  comments: string; 
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  filter: string = '';

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private apiService: ApiService // Use o serviço da API
  ) {}

  // Filtra as notas com base no estado
  filterNotes(): void {
    console.log('Filtrando as viagens por status:', this.filter);
    this.filteredNotes = this.notes.filter((note) => note.state === this.filter);
    console.log('viagens filtradas:', this.filteredNotes);
  }

  // Abre o modal para adicionar ou editar uma viagem
  async openDetails(note: Note | null = null): Promise<void> {
    const modal = await this.modalController.create({
      component: NoteDetailsComponent, // Componente para adicionar/editar viagem
      componentProps: { note },
      backdropDismiss: false,

      
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.message === 'update') {
      await this.getAllTravels();
      if (data?.updated) {
        this.loadNotes(); // Recarrega as notas após o modal fechar
      }
    }
  }

  // Recupera as viagens da API e as exibe
  async getAllTravels(): Promise<void> {
    console.log('Lendo viagens...');
    const loading = await this.showLoading();

    try {
      // Use o ApiService para buscar os dados
      this.notes = await firstValueFrom(this.apiService.getAllTravels());
      console.log('Loaded notes:', this.notes); // Exibe as viagens carregadas
      this.filterNotes();
      loading.dismiss();

      if (this.notes.length === 0) {
        await this.presentToast('Não há viagens 😥', 'warning');
      } else {
        await this.presentToast(`Carregada(s) com sucesso ${this.notes.length} viagens 🚀`, 'success');
      }
    } catch (error: any) {
      console.log('Erro carregando viagens:', error);
      loading.dismiss();
      await this.presentToast(error.error || 'Error recuperando viagens', 'danger');
    }
  }

  // Método executado ao entrar na página para carregar as notas
  async ionViewWillEnter(): Promise<void> {
    await this.getAllTravels();
  }

  // Exibe um loading spinner enquanto os dados estão sendo carregados
  private async showLoading(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      message: 'Aguarde...',
      spinner: 'crescent',
    });
    await loading.present();
    return loading;
  }

  // Exibe um toast com a mensagem e cor informada
  private async presentToast(message: string, color: 'success' | 'danger' | 'warning'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

  async loadNotes() {
    try {
      this.notes = await this.apiService.getAllTravels().toPromise();
    } catch (error) {
      console.error('Erro ao carregar viagens:', error);
    }
  }
  
}
