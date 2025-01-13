import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Definindo o tipo de Note para maior clareza e segurança
type Note = {
  id: number;
  title: string;
  status: 'TODO' | 'DONE';  // Limita os valores do status
  priority: string;
};

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  noteId: string | null = null; // ID da nota recebido pela URL
  noteContent: string = ''; // Conteúdo da nota
  noteState: 'TODO' | 'DONE' = 'TODO'; // Estado da nota (com tipos restritos)
  notePriority: string = ''; // Prioridade da nota

  // Formulário de edição da nota
  noteForm: FormGroup;

  // Propriedades para mostrar Toast de feedback
  showToast: boolean = false;
  toastMessage: string = '';
  toastColor: string = 'success';

  // Lista simulada de notas
  notes: Note[] = [
    { id: 1, title: 'Levar o carro à inspeção', status: 'TODO', priority: 'Normal' },
    { id: 2, title: 'Pagar o Moche', status: 'TODO', priority: 'Alta' },
    { id: 3, title: 'Estudar para o UC de Mobile', status: 'DONE', priority: 'Crítica' },
  ];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private formBuilder: FormBuilder
  ) {
    // Inicializa o formulário com validações
    this.noteForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.minLength(5)]], // Validando conteúdo mínimo
      state: ['TODO', Validators.required],
      priority: ['NORMAL', Validators.required],
    });
  }

  ngOnInit() {
    // Obtém o parâmetro "id" da URL
    this.noteId = this.route.snapshot.paramMap.get('id');

    if (this.noteId) {
      const id = parseInt(this.noteId, 10);

      if (!isNaN(id)) {
        // Carrega os dados da nota com base no ID
        const note = this.notes.find(note => note.id === id);
        if (note) {
          this.noteContent = note.title;
          this.noteState = note.status; // Define o estado com o valor da nota
          this.notePriority = note.priority;

          // Preenche o formulário com os dados da nota
          this.noteForm.patchValue({
            content: note.title,
            state: note.status,
            priority: note.priority,
          });
        } else {
          this.showError('Nota não encontrada!');
        }
      } else {
        this.showError('ID inválido recebido.');
      }
    } else {
      this.showError('ID não fornecido na URL.');
    }
  }

  // Método para fechar a página e voltar à anterior
  closePage() {
    this.navCtrl.back();
  }

  // Método para apagar a nota, com confirmação via AlertController
  async deleteNote() {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: 'Tem certeza de que deseja excluir esta nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => console.log('Exclusão cancelada!'),
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            console.log('Nota apagada!');
            this.navCtrl.back(); // Volta após deletar
          },
        },
      ],
    });

    await alert.present();
  }

  // Método para salvar as alterações na nota
  async saveChanges() {
    // Validação simples antes de salvar
    if (!this.noteForm.valid) {
      this.showError('Por favor, preencha todos os campos corretamente.');
      return;
    }

    // Persistindo alterações (atualização da lista de notas por exemplo)
    const updatedNote: Note = {
      id: parseInt(this.noteId!, 10), // Supondo que a nota esteja sendo editada
      title: this.noteForm.value.content,
      status: this.noteForm.value.state, // Usando o estado validado
      priority: this.noteForm.value.priority,
    };

    const index = this.notes.findIndex(note => note.id === updatedNote.id);
    if (index > -1) {
      this.notes[index] = updatedNote; // Substitui a nota pela nova versão
    }

    console.log('Nota salva!', updatedNote);

    // Mostrar o feedback de sucesso
    this.toastMessage = 'Alterações salvas com sucesso!';
    this.toastColor = 'success';
    this.showToast = true;

    // Exibir o toast de sucesso
    const toast = await this.toastController.create({
      message: this.toastMessage,
      color: this.toastColor,
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
    this.navCtrl.back(); // Volta para a página anterior após salvar
  }

  // Exibe mensagens de erro ao usuário usando ToastController
  private async showError(message: string) {
    this.toastMessage = message;
    this.toastColor = 'danger';
    this.showToast = true;

    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'bottom',
    });
    await toast.present();
  }
}
