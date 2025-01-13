import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { NoteDetailsGroupBComponent } from './note-details-group-b.component';

export interface Note {
  id: string;
  description: string;
  type: string;
  state: string;
  startAt: Date;
  endAt: Date;
}

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit {
  @Input() note: Note | null = null; // Recebe o objeto da nota como entrada
  form: FormGroup;
  showStartCalendar = false; // Controla exibição do calendário de início
  showEndCalendar = false;   // Controla exibição do calendário de fim

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private apiService: ApiService,
    private toastController: ToastController
  ) {
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      type: ['', Validators.required],
      state: ['', Validators.required],
      startAt: ['', Validators.required],
      endAt: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.note) {
      this.form.patchValue({
        ...this.note,
        startAt: this.note.startAt ? new Date(this.note.startAt).toISOString() : '',
        endAt: this.note.endAt ? new Date(this.note.endAt).toISOString() : '',
      });
    }
  }

  // Formata a data para exibição no input
  formatDate(value: string | null): string {
    if (!value) return '';
    const date = new Date(value);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  // Alterna exibição do calendário de início
  toggleStartCalendar() {
    this.showStartCalendar = !this.showStartCalendar;
  }

  // Alterna exibição do calendário de fim
  toggleEndCalendar() {
    this.showEndCalendar = !this.showEndCalendar;
  }

  // Manipula alteração na data de início
  onStartDateChange(event: any) {
    const date = event.detail.value;
    this.form.get('startAt')?.setValue(date);
    this.showStartCalendar = false; // Fecha o calendário após seleção
  }

  // Manipula alteração na data de fim
  onEndDateChange(event: any) {
    const date = event.detail.value;
    this.form.get('endAt')?.setValue(date);
    this.showEndCalendar = false; // Fecha o calendário após seleção
  }

  // Salvar alterações
  async save() {
    if (this.form.valid) {
      try {
        const updatedNote = { ...this.note, ...this.form.value };
        await this.apiService.updateTravel(updatedNote.id, updatedNote).toPromise();
        await this.presentToast('Registro atualizado com sucesso!', 'success');
        this.dismiss(true);
      } catch (error) {
        console.error('Erro ao atualizar registro:', error);
        await this.presentToast('Erro ao atualizar registro.', 'danger');
      }
    }
  }

  // Abrir o segundo modal
  
  async openGroupBModal() {
    const modal = await this.modalController.create({
      component: NoteDetailsGroupBComponent,
      componentProps: { note: this.note }, // Passa os dados da nota para o segundo modal
    });
  
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    if (data?.updated) {
      await this.presentToast('Campos adicionais atualizados com sucesso!', 'success');
    }
  }
  
  private async presentToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

  dismiss(updated: boolean = false) {
    this.modalController.dismiss({ updated });
  }
}
