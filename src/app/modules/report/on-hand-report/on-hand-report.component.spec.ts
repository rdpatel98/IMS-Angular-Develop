import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnHandReportComponent } from './on-hand-report.component';

describe('OnHandReportComponent', () => {
  let component: OnHandReportComponent;
  let fixture: ComponentFixture<OnHandReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnHandReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnHandReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
