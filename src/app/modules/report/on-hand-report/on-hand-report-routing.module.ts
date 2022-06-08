import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnHandReportComponent } from './on-hand-report.component';

const routes: Routes = [{ path: '', component: OnHandReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnHandReportRoutingModule { }
