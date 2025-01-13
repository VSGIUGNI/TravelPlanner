import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

// Atualizando o tipo de viagem'
type Note = {
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
};

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let modalCtrlSpy: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule, // Simula chamadas HTTP
        ReactiveFormsModule, // Necessário para trabalhar com formulários reativos
        FormsModule // Necessário para o ion-segment com [(ngModel)]
      ],
      providers: [
        { provide: ModalController, useValue: modalCtrlSpy } // Mock do ModalController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have openDetails method', () => {
    expect(typeof component.openDetails).toBe('function');
  });

  it('should call ModalController when openDetails is invoked', async () => {
    const noteMock: Note = {
      id: '1', // Identificador único da nota
      description: 'Viagem TESTE', // Descrição da nota
      state: 'Realizado', // Estado da nota
      type: 'Trabalho', // Tipo de nota
      map: '', // Caminho para o mapa (string vazia como padrão)
      startAt: new Date('2023-12-01'), // Data de início (exemplo fictício)
      endAt: new Date('2023-12-10'), // Data de término (exemplo fictício)
      createdby: 'user123', // Criado por (usuário fictício)
      createdate: new Date('2023-11-25'), // Data de criação (exemplo fictício)
      prop1: 'Prop 1 Test', // Valor para prop1
      prop2: 'Prop 2 Test', // Valor para prop2
      prop3: 'Prop 3 Test', // Valor para prop3
      isfav: true, // Marcado como favorito
      locations: 'Teste Localizações', // Localizações associadas
      comments: '1. Teste Commententários 2. Comantário Teste' // Comentários associados
    };

  // Mock do modal
  const modalSpy = jasmine.createSpyObj('HTMLIonModalElement', ['present', 'onWillDismiss']);
  modalSpy.onWillDismiss.and.resolveTo({ data: { message: 'update' }, role: 'success' });

  // Mock do ModalController
  modalCtrlSpy.create.and.resolveTo(modalSpy);


    await component.openDetails(noteMock);

    // Verificar se o método create foi chamado corretamente
    expect(modalCtrlSpy.create).toHaveBeenCalledWith({
      component: jasmine.any(Function), // Verifica se o componente está sendo passado corretamente
      componentProps: { note: noteMock }, // Verifica se as propriedades do componente foram passadas corretamente
      backdropDismiss: false
    });

    // Verificar se o modal foi apresentado
    expect(modalSpy.present).toHaveBeenCalled();
  });

  it('should filter notes by state', () => {
    // Preparar o filtro
    component.filter = 'Planeado';
    component.filterNotes();
    
    // Verificar se as notas filtradas têm o estado correto
    expect(component.filteredNotes.length).toBeGreaterThan(0);
    expect(component.filteredNotes.every(note => note.state === 'TODO')).toBeTrue();
  });

  it('should set correct filteredNotes on initialization', () => {
    // Preparar o filtro
    component.filter = 'Realizado';
    component.filterNotes();

    // Verificar se as notas filtradas têm o estado correto
    expect(component.filteredNotes.length).toBeGreaterThan(0);
    expect(component.filteredNotes.every(note => note.state === 'DONE')).toBeTrue();
  });

  it('should show correct notes counter', () => {
    // Preparar o filtro
    component.filter = 'Planeado';
    component.filterNotes();

    // Disparar a mudança na view
    fixture.detectChanges();

    // Verificar se o contador de notas está correto na interface
    const notesCounter = fixture.nativeElement.querySelector('.notes-counter div');
    expect(notesCounter.textContent).toContain(`${component.filteredNotes.length} NOTAS`);
  });
});
