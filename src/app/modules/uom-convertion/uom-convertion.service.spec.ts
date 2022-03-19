import { TestBed } from '@angular/core/testing';

import { UomConvertionService } from './uom-convertion.service';

describe('UomConvertionService', () => {
  let service: UomConvertionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UomConvertionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
