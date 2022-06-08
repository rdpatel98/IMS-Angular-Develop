import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseEnquiryReportRoutingModule } from './purchase-enquiry-report-routing.module';
import { PurchaseEnquiryReportComponent } from './purchase-enquiry-report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
    PurchaseEnquiryReportComponent
  ],
  imports: [
    CommonModule,
    PurchaseEnquiryReportRoutingModule,
    SharedModule,
    LayoutModule
  ]
})
export class PurchaseEnquiryReportModule { }
