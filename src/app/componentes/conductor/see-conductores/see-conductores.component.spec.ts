import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeConductoresComponent } from './see-conductores.component';

describe('SeeConductoresComponent', () => {
  let component: SeeConductoresComponent;
  let fixture: ComponentFixture<SeeConductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeConductoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
