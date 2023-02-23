import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeChefsComponent } from './see-chefs.component';

describe('SeeChefsComponent', () => {
  let component: SeeChefsComponent;
  let fixture: ComponentFixture<SeeChefsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeChefsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeChefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
