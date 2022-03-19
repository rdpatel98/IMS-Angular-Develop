import { TestBed } from '@angular/core/testing';

import { ItemConsumptionService } from './item-consumption.service';

describe('ItemConsumptionService', () => {
  let service: ItemConsumptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemConsumptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
