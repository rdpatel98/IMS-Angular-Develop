import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemConsumptionRoutingModule } from './item-consumption-routing.module';
import { ItemConsumptionComponent } from './item-consumption.component';
import {SharedModule} from "../../shared/shared.module";
import {LayoutModule} from "../../layout/layout.module";



@NgModule({
  declarations: [
    ItemConsumptionComponent
  ],
    imports: [
        CommonModule,
        ItemConsumptionRoutingModule,
        SharedModule,
        LayoutModule
    ]
})
export class ItemConsumptionModule { }
