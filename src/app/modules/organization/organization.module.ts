import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAddressComponent } from '../add-address/add-address.component';
import {LayoutModule} from "../../layout/layout.module";
// import {LayoutModule} from "../../layout/layout.module";
// import { HeaderComponent } from 'src/app/layout/header/header.component';
// import { SiderbarComponent } from 'src/app/layout/siderbar/siderbar.component';
// import { FooterComponent } from 'src/app/layout/footer/footer.component';


@NgModule({
  declarations: [
    // HeaderComponent,
    // SiderbarComponent,
    // FooterComponent,
    OrganizationComponent,
    AddAddressComponent,
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    SharedModule.forRoot(),
    LayoutModule,
    // LayoutModule,
  ]
})
export class OrganizationModule { }
