import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrderViewRoutingModule } from './purchase-order-view-routing.module';
import { PurchaseOrderViewComponent } from './purchase-order-view.component';
import {SharedModule} from "../../../shared/shared.module";
import {LayoutModule} from "../../../layout/layout.module";


@NgModule({
  declarations: [
    PurchaseOrderViewComponent
  ],
    imports: [
        CommonModule,
        PurchaseOrderViewRoutingModule,
        SharedModule,
        LayoutModule
    ]
})
export class PurchaseOrderViewModule { }
