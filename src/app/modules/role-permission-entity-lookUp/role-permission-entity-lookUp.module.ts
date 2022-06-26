import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolePermissionEntityLookUpRoutingModule } from './role-permission-entity-lookUp-routing.module';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {LayoutModule} from "../../layout/layout.module";
import { RolePermissionEntityLookUpComponent } from './role-permission-entity-lookUp.component';


@NgModule({
  declarations: [
    RolePermissionEntityLookUpComponent,
    CreateComponent
  ],
    imports: [
        CommonModule,
        RolePermissionEntityLookUpRoutingModule,
        SharedModule,
        LayoutModule
    ]
})
export class RolePermissionEntityLookUpModule { }