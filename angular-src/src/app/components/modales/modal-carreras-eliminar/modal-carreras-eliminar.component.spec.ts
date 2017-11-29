import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCarrerasEliminarComponent } from './modal-carreras-eliminar.component';

describe('ModalCarrerasEliminarComponent', () => {
  let component: ModalCarrerasEliminarComponent;
  let fixture: ComponentFixture<ModalCarrerasEliminarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCarrerasEliminarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCarrerasEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
