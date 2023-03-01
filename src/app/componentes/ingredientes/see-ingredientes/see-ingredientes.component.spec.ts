import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeIngredientesComponent } from './see-ingredientes.component';

describe('SeeIngredientesComponent', () => {
  let component: SeeIngredientesComponent;
  let fixture: ComponentFixture<SeeIngredientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeIngredientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeIngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
