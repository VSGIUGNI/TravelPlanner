import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-note-details-group-b',
  templateUrl: './note-details-group-b.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsGroupBComponent implements OnInit {
  @Input() note: any | null = null; // Recebe os dados da viagem
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private apiService: ApiService,
    private toastController: ToastController
  ) {
    this.form = this.formBuilder.group({
      map: [''],
      prop1: [''],
      prop2: [''],
      prop3: [''],
      isfav: [false],
      locations: [''],
      comments: [''],
    });
  }

  ngOnInit() {
    if (this.note) {
      this.form.patchValue(this.note); // Preenche os campos do formulário com os dados da nota
    }
  }

  async save() {
    if (this.form.valid) {
      try {
        const updatedNote = { ...this.note, ...this.form.value };
        await this.apiService.updateTravel(updatedNote.id, updatedNote).toPromise(); // Atualiza na API
        await this.presentToast('Campos adicionais salvos com sucesso!', 'success');
        
        this.dismiss(true); // Fecha o modal indicando que os dados foram salvos
      } catch (error) {
        console.error('Erro ao salvar campos adicionais:', error);
        await this.presentToast('Erro ao salvar campos adicionais.', 'danger');
      }
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
