import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeePlatosComponent } from './see-platos.component';

describe('SeePlatosComponent', () => {
  let component: SeePlatosComponent;
  let fixture: ComponentFixture<SeePlatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeePlatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeePlatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
