import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UomConvertionComponent } from './uom-convertion.component';

const routes: Routes = [{ path: '', component: UomConvertionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UomConvertionRoutingModule { }
