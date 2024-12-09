import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTravelPage } from './edit-travel.page';

describe('EditTravelPage', () => {
  let component: EditTravelPage;
  let fixture: ComponentFixture<EditTravelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTravelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
