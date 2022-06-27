import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
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
    WarehouseComponent,
    CreateComponent
  ],
    imports: [
        CommonModule,
        WarehouseRoutingModule,
        SharedModule.forRoot(),
        LayoutModule
    ]
})
export class WarehouseModule { }
