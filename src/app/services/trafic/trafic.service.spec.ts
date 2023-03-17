import { TestBed } from '@angular/core/testing';

import { TraficService } from './trafic.service';

describe('TraficService', () => {
  let service: TraficService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraficService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
