import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCarrerasEditarComponent } from './modal-carreras-editar.component';

describe('ModalCarrerasEditarComponent', () => {
  let component: ModalCarrerasEditarComponent;
  let fixture: ComponentFixture<ModalCarrerasEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCarrerasEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCarrerasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
