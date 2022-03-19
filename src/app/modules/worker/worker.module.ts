import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkerRoutingModule } from './worker-routing.module';
import { WorkerComponent } from './worker.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateComponent } from './create/create.component';
import {LayoutModule} from "../../layout/layout.module";
// import { HeaderComponent } from 'src/app/layout/header/header.component';
// import { SiderbarComponent } from 'src/app/layout/siderbar/siderbar.component';
// import { FooterComponent } from 'src/app/layout/footer/footer.component';


@NgModule({
  declarations: [
    // HeaderComponent,
    // SiderbarComponent,
    // FooterComponent,
    WorkerComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    WorkerRoutingModule,
    SharedModule,
    LayoutModule
  ]
})
export class WorkerModule { }
