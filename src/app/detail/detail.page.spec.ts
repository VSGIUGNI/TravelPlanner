import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { DetailPage } from './detail.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser'; // Para buscar elementos com seletores

describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;
  let modalController: ModalController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule, // Suporte a formulários reativos
        HttpClientTestingModule,
      ],
      providers: [ModalController],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;
    modalController = TestBed.inject(ModalController);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default note data', () => {
    expect(component.noteContent).toBeUndefined();
    expect(component.noteState).toBeUndefined();
    expect(component.notePriority).toBeUndefined();
  });

  it('should properly update note data', () => {
    component.noteContent = 'Updated Note Content';
    component.noteState = 'DONE';
    component.notePriority = 'CRITICAL';
    fixture.detectChanges();
    expect(component.noteContent).toBe('Updated Note Content');
    expect(component.noteState).toBe('DONE');
    expect(component.notePriority).toBe('CRITICAL');
  });

  it('should call deleteNote when delete button is clicked', () => {
    spyOn(component, 'deleteNote');
    const button = fixture.nativeElement.querySelector('ion-button[color="danger"]');
    button.click();
    expect(component.deleteNote).toHaveBeenCalled();
  });

  it('should call saveChanges when save button is clicked', () => {
    spyOn(component, 'saveChanges');
    const button = fixture.nativeElement.querySelector('ion-button[expand="block"]');
    button.click();
    expect(component.saveChanges).toHaveBeenCalled();
  });

  it('should call closePage when close button is clicked', () => {
    spyOn(component, 'closePage');
    const button = fixture.nativeElement.querySelector('ion-button[slot="start"]');
    button.click();
    expect(component.closePage).toHaveBeenCalled();
  });

  it('should display correct note content in template', () => {
    component.noteContent = 'Display Test Content';
    component.noteState = 'TODO';
    component.notePriority = 'LOW';
    fixture.detectChanges();

    const cardTitle = fixture.nativeElement.querySelector('ion-card-title');
    const cardStatus = fixture.nativeElement.querySelector('p strong:first-child');
    const cardPriority = fixture.nativeElement.querySelector('p strong:last-child');

    expect(cardTitle.textContent).toContain('Display Test Content');
    expect(cardStatus.textContent).toContain('Status:');
    expect(cardPriority.textContent).toContain('Prioridade:');
  });

  it('should handle modal dismissal when closePage is called', async () => {
    spyOn(modalController, 'dismiss');
    await component.closePage();
    expect(modalController.dismiss).toHaveBeenCalled();
  });

  it('should reset note content when deleteNote is called', () => {
    component.noteContent = 'Note to be deleted';
    component.noteState = 'DONE';
    component.notePriority = 'CRITICAL';

    component.deleteNote();
    expect(component.noteContent).toBeUndefined();
    expect(component.noteState).toBeUndefined();
    expect(component.notePriority).toBeUndefined();
  });

  it('should correctly save changes when saveChanges is called', () => {
    component.noteContent = 'New Note Content';
    component.noteState = 'TODO';
    component.notePriority = 'NORMAL';

    spyOn(component, 'saveChanges').and.callThrough();
    component.saveChanges();

    expect(component.saveChanges).toHaveBeenCalled();
    expect(component.noteContent).toBe('New Note Content');
    expect(component.noteState).toBe('TODO');
    expect(component.notePriority).toBe('NORMAL');
  });

  it('should correctly change state to DONE and update the view', () => {
    component.noteState = 'TODO';
    component.noteContent = 'Test Note';
    fixture.detectChanges();

    // Alterando o estado da nota para 'DONE'
    component.noteState = 'DONE';
    component.saveChanges(); // Simula a gravação
    fixture.detectChanges(); // Força a detecção de mudanças

    // Verificando se a nota mudou para 'DONE' e a visualização é atualizada
    expect(component.noteState).toBe('DONE');
    const updatedState = fixture.nativeElement.querySelector('p strong:first-child');
    expect(updatedState.textContent).toContain('DONE');
  });
});
