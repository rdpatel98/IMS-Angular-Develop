import { TestBed } from '@angular/core/testing';

import { PermissionEntityService } from './permissionEntity.service';

describe('UomService', () => {
  let service: PermissionEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
