import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UomConvertionRoutingModule } from './uom-convertion-routing.module';
import { UomConvertionComponent } from './uom-convertion.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {LayoutModule} from "../../layout/layout.module";


@NgModule({
  declarations: [
    UomConvertionComponent,
    CreateComponent
  ],
    imports: [
        CommonModule,
        UomConvertionRoutingModule,
        SharedModule,
        LayoutModule
    ]
})
export class UomConvertionModule { }
