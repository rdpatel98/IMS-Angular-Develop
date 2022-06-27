import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemTypeRoutingModule } from './item-type-routing.module';
import { ItemTypeComponent } from './item-type.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {LayoutModule} from "../../layout/layout.module";


@NgModule({
  declarations: [
    ItemTypeComponent,
    CreateComponent
  ],
    imports: [
        CommonModule,
        ItemTypeRoutingModule,
        SharedModule.forRoot(),
        LayoutModule
    ]
})
export class ItemTypeModule { }
