import { TestBed } from '@angular/core/testing';

import { RolePermissionEntityLookUpService } from './role-permission-entity-lookUp.service';

describe('UomService', () => {
  let service: RolePermissionEntityLookUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolePermissionEntityLookUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
