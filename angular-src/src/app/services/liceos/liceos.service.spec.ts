import { TestBed, inject } from '@angular/core/testing';

import { LiceosService } from './liceos.service';

describe('LiceosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiceosService]
    });
  });

  it('should ...', inject([LiceosService], (service: LiceosService) => {
    expect(service).toBeTruthy();
  }));
});
