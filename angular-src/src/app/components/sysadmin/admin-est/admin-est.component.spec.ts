import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEstComponent } from './admin-Est.component';

describe('AdminEstComponent', () => {
  let component: AdminEstComponent;
  let fixture: ComponentFixture<AdminEstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
