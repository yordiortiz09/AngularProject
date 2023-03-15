import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecetaComponent } from './create-receta.component';

describe('CreateRecetaComponent', () => {
  let component: CreateRecetaComponent;
  let fixture: ComponentFixture<CreateRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRecetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
