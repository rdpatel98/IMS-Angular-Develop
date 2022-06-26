import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionEntityLookUpComponent } from './permission-entity-lookUp.component';

describe('PermissionEntityLookUpComponent', () => {
  let component: PermissionEntityLookUpComponent;
  let fixture: ComponentFixture<PermissionEntityLookUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionEntityLookUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionEntityLookUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
