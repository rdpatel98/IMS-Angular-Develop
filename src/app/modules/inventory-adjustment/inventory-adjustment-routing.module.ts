import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryAdjustmentComponent } from './inventory-adjustment.component';

const routes: Routes = [{ path: '', component: InventoryAdjustmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryAdjustmentRoutingModule { }
