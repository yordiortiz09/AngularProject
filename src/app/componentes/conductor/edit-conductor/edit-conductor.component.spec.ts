import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConductorComponent } from './edit-conductor.component';

describe('EditConductorComponent', () => {
  let component: EditConductorComponent;
  let fixture: ComponentFixture<EditConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConductorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
