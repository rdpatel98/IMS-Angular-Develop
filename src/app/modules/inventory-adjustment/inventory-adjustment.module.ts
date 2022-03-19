import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryAdjustmentRoutingModule } from './inventory-adjustment-routing.module';
import { InventoryAdjustmentComponent } from './inventory-adjustment.component';
import { SharedModule } from '../../shared/shared.module';
import {LayoutModule} from "../../layout/layout.module";

@NgModule({
  declarations: [
    InventoryAdjustmentComponent
  ],
    imports: [
        CommonModule,
        InventoryAdjustmentRoutingModule,
        SharedModule,
        LayoutModule
    ]
})
export class InventoryAdjustmentModule { }
