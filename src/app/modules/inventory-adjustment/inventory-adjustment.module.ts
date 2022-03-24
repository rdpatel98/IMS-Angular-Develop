import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryAdjustmentRoutingModule } from './inventory-adjustment-routing.module';
import { InventoryAdjustmentComponent } from './inventory-adjustment.component';
import { SharedModule } from '../../shared/shared.module';
import {LayoutModule} from "../../layout/layout.module";
import { InventoryAdjustmentListComponent } from './inventory-adjustment-list/inventory-adjustment-list.component';

@NgModule({
  declarations: [
    InventoryAdjustmentComponent,    
  ],
    imports: [
        CommonModule,
        InventoryAdjustmentRoutingModule,
        SharedModule,
        LayoutModule
    ]
})
export class InventoryAdjustmentModule { }
