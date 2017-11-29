import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMatriculaEgresosComponent } from './modal-matricula-egresos.component';

describe('ModalMatriculaEgresosComponent', () => {
  let component: ModalMatriculaEgresosComponent;
  let fixture: ComponentFixture<ModalMatriculaEgresosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMatriculaEgresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMatriculaEgresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
