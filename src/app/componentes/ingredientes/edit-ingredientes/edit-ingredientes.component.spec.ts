import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIngredientesComponent } from './edit-ingredientes.component';

describe('EditIngredientesComponent', () => {
  let component: EditIngredientesComponent;
  let fixture: ComponentFixture<EditIngredientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIngredientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
