import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookUpRoutingModule } from './lookup-routing.module';
import { LookUpComponent } from './lookup.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {LayoutModule} from "../../layout/layout.module";


@NgModule({
  declarations: [
    LookUpComponent,
    CreateComponent
  ],
    imports: [
        CommonModule,
        LookUpRoutingModule,
        SharedModule,
        LayoutModule
    ]
})
export class LookUpModule { }