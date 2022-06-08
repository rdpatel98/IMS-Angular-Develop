import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutComponent } from 'src/app/layout/layout.component';
// import {HeaderComponent} from './layout/header/header.component';
// import {SiderbarComponent} from './layout/siderbar/siderbar.component';
// import {FooterComponent} from './layout/footer/footer.component';
import { SharedModule } from "./shared/shared.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { LayoutModule } from "./layout/layout.module";
import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        // HeaderComponent,
        // SiderbarComponent,
        // FooterComponent,
        LayoutComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        LayoutModule,

    ],
    providers: [{
        provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 },
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    }],

    bootstrap: [AppComponent]
})
export class AppModule {
}
