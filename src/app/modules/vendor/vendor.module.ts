import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create/create.component';
import {LayoutModule} from "../../layout/layout.module";


@NgModule({
  declarations: [
    VendorComponent,
    CreateComponent
  ],
    imports: [
        CommonModule,
        VendorRoutingModule,
        SharedModule,
        LayoutModule
    ]
})
export class VendorModule { }
