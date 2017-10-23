import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPnevComponent } from './admin-pnev.component';

describe('AdminPnevComponent', () => {
  let component: AdminPnevComponent;
  let fixture: ComponentFixture<AdminPnevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPnevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPnevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
