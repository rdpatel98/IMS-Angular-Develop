import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePermissionEntityLookUpComponent } from './role-permission-entity-lookUp.component';

describe('RolePermissionEntityLookUpComponent', () => {
  let component: RolePermissionEntityLookUpComponent;
  let fixture: ComponentFixture<RolePermissionEntityLookUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolePermissionEntityLookUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePermissionEntityLookUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
