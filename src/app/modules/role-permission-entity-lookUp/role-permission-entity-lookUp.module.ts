import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolePermissionEntityLookUpRoutingModule } from './role-permission-entity-lookUp-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {LayoutModule} from "../../layout/layout.module";
import { RolePermissionEntityLookUpComponent } from './role-permission-entity-lookUp.component';
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
  declarations: [
    RolePermissionEntityLookUpComponent
  ],
    imports: [
        CommonModule,
        RolePermissionEntityLookUpRoutingModule,
        SharedModule.forRoot(),
        LayoutModule,
        TreeviewModule.forRoot()
    ]
})
export class RolePermissionEntityLookUpModule { }