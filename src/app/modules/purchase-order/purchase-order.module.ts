import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { PurchaseOrderComponent } from './purchase-order.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReceiveInvoiceComponent } from './receive-invoice/receive-invoice.component';
import {LayoutModule} from "../../layout/layout.module";


@NgModule({
  declarations: [
    PurchaseOrderComponent,
    ReceiveInvoiceComponent
  ],
    imports: [
        CommonModule,
        PurchaseOrderRoutingModule,
        SharedModule,
        LayoutModule
    ]
})
export class PurchaseOrderModule { }
