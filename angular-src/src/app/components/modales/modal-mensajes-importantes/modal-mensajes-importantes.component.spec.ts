import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMensajesImportantesComponent } from './modal-mensajes-importantes.component';

describe('ModalMensajesImportantesComponent', () => {
  let component: ModalMensajesImportantesComponent;
  let fixture: ComponentFixture<ModalMensajesImportantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMensajesImportantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMensajesImportantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
