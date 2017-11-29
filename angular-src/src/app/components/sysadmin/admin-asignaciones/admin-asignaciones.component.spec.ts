import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAsignacionesComponent } from './admin-asignaciones.component';

describe('AdminAsignacionesComponent', () => {
  let component: AdminAsignacionesComponent;
  let fixture: ComponentFixture<AdminAsignacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAsignacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
