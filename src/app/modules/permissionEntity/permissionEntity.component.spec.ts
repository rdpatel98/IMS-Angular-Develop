import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionEntityComponent } from './permissionEntity.component';

describe('PermissionEntityComponent', () => {
  let component: PermissionEntityComponent;
  let fixture: ComponentFixture<PermissionEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
