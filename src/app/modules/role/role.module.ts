import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {LayoutModule} from "../../layout/layout.module";


@NgModule({
  declarations: [
    RoleComponent,
    CreateComponent
  ],
    imports: [
        CommonModule,
        RoleRoutingModule,
        SharedModule.forRoot(),
        LayoutModule
    ]
})
export class RoleModule { }