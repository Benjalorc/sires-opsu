import { TestBed, inject } from '@angular/core/testing';

import { UniversidadesService } from './universidades.service';

describe('UniversidadesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniversidadesService]
    });
  });

  it('should ...', inject([UniversidadesService], (service: UniversidadesService) => {
    expect(service).toBeTruthy();
  }));
});
