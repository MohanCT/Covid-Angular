import { TestBed } from '@angular/core/testing';

import { CovidserviceService } from './covidservice.service';

describe('CovidserviceService', () => {
  let service: CovidserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
