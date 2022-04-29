import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseEnquiryReportComponent } from './purchase-enquiry-report.component';

describe('PurchaseEnquiryReportComponent', () => {
  let component: PurchaseEnquiryReportComponent;
  let fixture: ComponentFixture<PurchaseEnquiryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseEnquiryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseEnquiryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
