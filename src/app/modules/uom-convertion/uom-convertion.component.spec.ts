import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UomConvertionComponent } from './uom-convertion.component';

describe('UomConvertionComponent', () => {
  let component: UomConvertionComponent;
  let fixture: ComponentFixture<UomConvertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UomConvertionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UomConvertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
