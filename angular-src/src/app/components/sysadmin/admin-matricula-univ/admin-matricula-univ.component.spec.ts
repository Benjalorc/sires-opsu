import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatriculaUnivComponent } from './admin-matricula-univ.component';

describe('AdminMatriculaUnivComponent', () => {
  let component: AdminMatriculaUnivComponent;
  let fixture: ComponentFixture<AdminMatriculaUnivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMatriculaUnivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMatriculaUnivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
