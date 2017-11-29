import { TestBed, inject } from '@angular/core/testing';

import { IndicadoresService } from './indicadores.service';

describe('IndicadoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndicadoresService]
    });
  });

  it('should be created', inject([IndicadoresService], (service: IndicadoresService) => {
    expect(service).toBeTruthy();
  }));
});
