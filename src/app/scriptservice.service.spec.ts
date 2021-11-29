import { TestBed } from '@angular/core/testing';

import { ScriptService } from './scriptservice.service';

describe('ScriptService', () => {
  let service: ScriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
