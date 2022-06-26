import { TestBed } from '@angular/core/testing';

import { PermissionEntityLookUpService } from './permission-entity-lookUp.service';

describe('UomService', () => {
  let service: PermissionEntityLookUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionEntityLookUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
