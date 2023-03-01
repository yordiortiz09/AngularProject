import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIngredientesComponent } from './create-ingredientes.component';

describe('CreateIngredientesComponent', () => {
  let component: CreateIngredientesComponent;
  let fixture: ComponentFixture<CreateIngredientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIngredientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateIngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
