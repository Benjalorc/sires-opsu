import { TestBed, inject } from '@angular/core/testing';

import { SnisService } from './snis.service';

describe('SnisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnisService]
    });
  });

  it('should be created', inject([SnisService], (service: SnisService) => {
    expect(service).toBeTruthy();
  }));
});
