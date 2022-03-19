import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemConsumptionComponent } from './item-consumption.component';

const routes: Routes = [{ path: '', component: ItemConsumptionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemConsumptionRoutingModule { }
