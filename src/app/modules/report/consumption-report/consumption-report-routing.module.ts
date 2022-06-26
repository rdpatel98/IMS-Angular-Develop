import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/authentication/auth.guard';
import { ConsumptionReportComponent } from './consumption-report.component';

const routes: Routes = [{ path: '',canActivate: [AuthGuard], component: ConsumptionReportComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumptionReportRoutingModule { }
