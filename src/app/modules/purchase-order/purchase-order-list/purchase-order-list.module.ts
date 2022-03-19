import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrderListRoutingModule } from './purchase-order-list-routing.module';
import { PurchaseOrderListComponent } from './purchase-order-list.component';
import {SharedModule} from "../../../shared/shared.module";
import {LayoutModule} from "../../../layout/layout.module";


@NgModule({
  declarations: [
    PurchaseOrderListComponent
  ],
    imports: [
        CommonModule,
        PurchaseOrderListRoutingModule,
        SharedModule,
        LayoutModule
    ]
})
export class PurchaseOrderListModule { }
