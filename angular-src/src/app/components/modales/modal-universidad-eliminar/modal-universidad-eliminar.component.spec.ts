import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUniversidadEliminarComponent } from './modal-universidad-eliminar.component';

describe('ModalUniversidadEliminarComponent', () => {
  let component: ModalUniversidadEliminarComponent;
  let fixture: ComponentFixture<ModalUniversidadEliminarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUniversidadEliminarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUniversidadEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
