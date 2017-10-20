import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarrComponent } from './admin-carr.component';

describe('AdminCarrComponent', () => {
  let component: AdminCarrComponent;
  let fixture: ComponentFixture<AdminCarrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCarrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCarrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
