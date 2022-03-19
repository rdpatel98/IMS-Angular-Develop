import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {LayoutModule} from "../../../layout/layout.module";
// import { HeaderComponent } from 'src/app/layout/header/header.component';
// import { SiderbarComponent } from 'src/app/layout/siderbar/siderbar.component';
// import { FooterComponent } from 'src/app/layout/footer/footer.component';


@NgModule({
  declarations: [
    ViewComponent,
    // HeaderComponent,
    // SiderbarComponent,
    // FooterComponent,
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule,
    LayoutModule
  ]
})
export class ViewModule { }
