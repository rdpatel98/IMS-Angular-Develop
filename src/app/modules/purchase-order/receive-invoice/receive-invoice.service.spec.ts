import { TestBed } from '@angular/core/testing';

import { ReceiveInvoiceService } from './receive-invoice.service';

describe('ReceiveInvoiceService', () => {
  let service: ReceiveInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiveInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
