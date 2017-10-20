import { TestBed, inject } from '@angular/core/testing';

import { PnevsService } from './pnevs.service';

describe('PnevsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PnevsService]
    });
  });

  it('should be created', inject([PnevsService], (service: PnevsService) => {
    expect(service).toBeTruthy();
  }));
});
