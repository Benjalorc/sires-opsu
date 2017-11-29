import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOfertaUnivComponent } from './admin-oferta-univ.component';

describe('AdminOfertaUnivComponent', () => {
  let component: AdminOfertaUnivComponent;
  let fixture: ComponentFixture<AdminOfertaUnivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOfertaUnivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOfertaUnivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
