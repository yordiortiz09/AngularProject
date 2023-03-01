import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlatosComponent } from './create-platos.component';

describe('CreatePlatosComponent', () => {
  let component: CreatePlatosComponent;
  let fixture: ComponentFixture<CreatePlatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePlatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
