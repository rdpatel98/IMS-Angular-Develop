import { TestBed } from '@angular/core/testing';

import { RoleService } from './role.service';

describe('UomService', () => {
  let service: RoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
