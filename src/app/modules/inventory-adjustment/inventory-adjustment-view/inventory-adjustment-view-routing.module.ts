import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryAdjustmentViewComponent } from './inventory-adjustment-view.component';

const routes: Routes = [{ path: '', component: InventoryAdjustmentViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryAdjustmentViewRoutingModule { }
