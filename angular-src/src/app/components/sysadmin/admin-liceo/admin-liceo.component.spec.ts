import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLiceoComponent } from './admin-liceo.component';

describe('AdminLiceoComponent', () => {
  let component: AdminLiceoComponent;
  let fixture: ComponentFixture<AdminLiceoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLiceoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLiceoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
