import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionEntityLookUpRoutingModule } from './permission-entity-lookUp-routing.module';
import { PermissionEntityLookUpComponent } from './permission-entity-lookUp.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {LayoutModule} from "../../layout/layout.module";


@NgModule({
  declarations: [
    PermissionEntityLookUpComponent,
    CreateComponent
  ],
    imports: [
        CommonModule,
        PermissionEntityLookUpRoutingModule,
        SharedModule.forRoot(),
        LayoutModule
    ]
})
export class PermissionEntityLookUpModule { }