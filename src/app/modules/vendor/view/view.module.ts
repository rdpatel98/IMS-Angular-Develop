import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {LayoutModule} from "../../../layout/layout.module";


@NgModule({
  declarations: [
    ViewComponent
  ],
    imports: [
        CommonModule,
        ViewRoutingModule,
        SharedModule.forRoot(),
        LayoutModule
    ]
})
export class ViewModule { }
