import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {LayoutModule} from "../../layout/layout.module";


@NgModule({
  declarations: [
    CategoryComponent,
    CreateComponent,
  ],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        SharedModule,
        LayoutModule
    ]
})
export class CategoryModule { }
