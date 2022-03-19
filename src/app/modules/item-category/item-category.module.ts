import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemCategoryRoutingModule } from './item-category-routing.module';
import { ItemCategoryComponent } from './item-category.component';
import {SharedModule} from "../../shared/shared.module";
import { CreateComponent } from './create/create.component';
import {LayoutModule} from "../../layout/layout.module";


@NgModule({
  declarations: [
    ItemCategoryComponent,
    CreateComponent
  ],
    imports: [
        CommonModule,
        ItemCategoryRoutingModule,
        SharedModule,
        LayoutModule
    ]
})
export class ItemCategoryModule { }
