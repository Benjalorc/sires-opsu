import { TestBed, inject } from '@angular/core/testing';

import { ParroquiasService } from './parroquias.service';

describe('ParroquiasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParroquiasService]
    });
  });

  it('should ...', inject([ParroquiasService], (service: ParroquiasService) => {
    expect(service).toBeTruthy();
  }));
});
