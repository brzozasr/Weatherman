import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { FlexModule } from "@angular/flex-layout";
import { MaterialModule } from "./materials/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './map/map.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {HttpClientModule} from "@angular/common/http";
import { MapErrorDialogComponent } from './map-error-dialog/map-error-dialog.component';
import { MapSearchComponent } from './map-search/map-search.component';
import {NgxEchartsModule} from "ngx-echarts";


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MapComponent,
    MapErrorDialogComponent,
    MapSearchComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FlexModule,
    BrowserAnimationsModule,
    LeafletModule,
    HttpClientModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
