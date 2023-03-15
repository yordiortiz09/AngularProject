import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeRecetaComponent } from './see-receta.component';

describe('SeeRecetaComponent', () => {
  let component: SeeRecetaComponent;
  let fixture: ComponentFixture<SeeRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeRecetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
