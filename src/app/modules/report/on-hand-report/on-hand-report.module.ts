import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnHandReportRoutingModule } from './on-hand-report-routing.module';
import { OnHandReportComponent } from './on-hand-report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
    OnHandReportComponent
  ],
  imports: [
    CommonModule,
    OnHandReportRoutingModule,
    SharedModule.forRoot(),
    LayoutModule
  ]
})
export class OnHandReportModule { }
