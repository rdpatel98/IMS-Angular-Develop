import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseEnquiryReportComponent } from './purchase-enquiry-report.component';

const routes: Routes = [{ path: '', component: PurchaseEnquiryReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseEnquiryReportRoutingModule { }
