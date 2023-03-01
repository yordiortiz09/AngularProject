import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlatosComponent } from './edit-platos.component';

describe('EditPlatosComponent', () => {
  let component: EditPlatosComponent;
  let fixture: ComponentFixture<EditPlatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPlatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPlatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
