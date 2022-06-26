import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionEntityRoutingModule } from './permissionEntity-routing.module';
import { PermissionEntityComponent } from './permissionEntity.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {LayoutModule} from "../../layout/layout.module";


@NgModule({
  declarations: [
    PermissionEntityComponent,
    CreateComponent
  ],
    imports: [
        CommonModule,
        PermissionEntityRoutingModule,
        SharedModule,
        LayoutModule
    ]
})
export class PermissionEntityModule { }