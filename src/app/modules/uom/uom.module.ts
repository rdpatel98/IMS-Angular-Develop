import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UomRoutingModule } from './uom-routing.module';
import { UomComponent } from './uom.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {LayoutModule} from "../../layout/layout.module";


@NgModule({
  declarations: [
    UomComponent,
    CreateComponent
  ],
    imports: [
        CommonModule,
        UomRoutingModule,
        SharedModule,
        LayoutModule
    ]
})
export class UomModule { }
