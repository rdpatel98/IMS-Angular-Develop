import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from "../../../shared/shared.module";
import {LayoutModule} from "../../../layout/layout.module";
import { InventoryAdjustmentViewComponent } from './inventory-adjustment-view.component';
import { InventoryAdjustmentViewRoutingModule } from './inventory-adjustment-view-routing.module';


@NgModule({
  declarations: [
    InventoryAdjustmentViewComponent
  ],
    imports: [
        CommonModule,
        InventoryAdjustmentViewRoutingModule,
        SharedModule.forRoot(),
        LayoutModule
    ]
})
export class InventoryAdjustmentViewModule { }
