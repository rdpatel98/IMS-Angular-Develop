import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsComponent } from './details/details.component';
import {LayoutModule} from "../../layout/layout.module";


@NgModule({
  declarations: [
    ItemsComponent,
    CreateComponent,
    DetailsComponent
  ],
    imports: [
        CommonModule,
        ItemsRoutingModule,
        SharedModule.forRoot(),
        LayoutModule
    ]
})
export class ItemsModule { }
