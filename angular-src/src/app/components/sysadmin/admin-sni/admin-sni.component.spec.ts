import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSniComponent } from './admin-sni.component';

describe('AdminSniComponent', () => {
  let component: AdminSniComponent;
  let fixture: ComponentFixture<AdminSniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
