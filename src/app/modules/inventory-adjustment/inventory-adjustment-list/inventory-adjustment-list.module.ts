import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { InventoryAdjustmentListRoutingModule } from './inventory-adjustment-list-routing.module';
import { InventoryAdjustmentListComponent } from './inventory-adjustment-list.component';



@NgModule({
  declarations: [InventoryAdjustmentListComponent],
  imports: [
    CommonModule,
    InventoryAdjustmentListRoutingModule,
    SharedModule.forRoot(),
    LayoutModule
  ]
})
export class InventoryAdjustmentListModule { }
