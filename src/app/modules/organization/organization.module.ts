import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAddressComponent } from '../add-address/add-address.component';
import {LayoutModule} from "../../layout/layout.module";
//import { SiderbarComponent } from 'src/app/layout/siderbar/siderbar.component';
// import {LayoutModule} from "../../layout/layout.module";
// import { HeaderComponent } from 'src/app/layout/header/header.component';
// import { SiderbarComponent } from 'src/app/layout/siderbar/siderbar.component';
// import { FooterComponent } from 'src/app/layout/footer/footer.component';


@NgModule({
  declarations: [
    OrganizationComponent,
    AddAddressComponent,
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    SharedModule,
    LayoutModule,
  ]
})
export class OrganizationModule { }
