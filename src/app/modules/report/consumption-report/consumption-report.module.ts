import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumptionReportRoutingModule } from './consumption-report-routing.module';
import { ConsumptionReportComponent } from './consumption-report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
    ConsumptionReportComponent
  ],
  imports: [
    CommonModule,
    ConsumptionReportRoutingModule,
    SharedModule,
    LayoutModule
  ]
})
export class ConsumptionReportModule { }
