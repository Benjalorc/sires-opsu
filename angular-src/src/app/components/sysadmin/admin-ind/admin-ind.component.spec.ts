import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIndComponent } from './admin-ind.component';

describe('AdminIndComponent', () => {
  let component: AdminIndComponent;
  let fixture: ComponentFixture<AdminIndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
