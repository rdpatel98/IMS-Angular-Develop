import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryAdjustmentListComponent } from './inventory-adjustment-list.component';

const routes: Routes = [{ path: '', component: InventoryAdjustmentListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryAdjustmentListRoutingModule { }
