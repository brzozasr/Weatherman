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
import { ForecastComponent } from './forecast/forecast.component';
import { HistoricalComponent } from './historical/historical.component';
import {LOCALE_ID} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import localePL from '@angular/common/locales/pl';
import { CurrentWfComponent } from './current-wf/current-wf.component';
import { MinutelyWfComponent } from './minutely-wf/minutely-wf.component';
import { LocationComponent } from './location/location.component';
import { GeoLocationComponent } from './geo-location/geo-location.component';
import { HourlyWfComponent } from './hourly-wf/hourly-wf.component';
import { AlertsWfComponent } from './alerts-wf/alerts-wf.component';
import {NgJoinPipeModule, NgReplacePipeModule, NgRoundPipeModule} from "angular-pipes";
import { DailyWfComponent } from './daily-wf/daily-wf.component';
import { HourlyChartsComponent } from './hourly-charts/hourly-charts.component';
import { HourlyTempChartComponent } from './hourly-temp-chart/hourly-temp-chart.component';
import {NgxEchartsModule} from "ngx-echarts";
import { HourlyPressureChartComponent } from './hourly-pressure-chart/hourly-pressure-chart.component';
import { HourlyHumidityChartComponent } from './hourly-humidity-chart/hourly-humidity-chart.component';
import { HourlyDewPointChartComponent } from './hourly-dew-point-chart/hourly-dew-point-chart.component';
import { HourlyUviChartComponent } from './hourly-uvi-chart/hourly-uvi-chart.component';
import { HourlyCloudsChartComponent } from './hourly-clouds-chart/hourly-clouds-chart.component';
import { HourlyWindSpeedChartComponent } from './hourly-wind-speed-chart/hourly-wind-speed-chart.component';
import { HourlyPrecipitationChartComponent } from './hourly-precipitation-chart/hourly-precipitation-chart.component';
import { DailyTempChartComponent } from './daily-temp-chart/daily-temp-chart.component';
import { MinMaxWhComponent } from './min-max-wh/min-max-wh.component';
import { BarImgWhComponent } from './bar-img-wh/bar-img-wh.component';
import { HistoricalChartsComponent } from './historical-charts/historical-charts.component';
import { WhTempChartComponent } from './wh-temperature/wh-temp-chart.component';

registerLocaleData(localePL);

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MapComponent,
    MapErrorDialogComponent,
    MapSearchComponent,
    ForecastComponent,
    HistoricalComponent,
    CurrentWfComponent,
    MinutelyWfComponent,
    LocationComponent,
    GeoLocationComponent,
    HourlyWfComponent,
    AlertsWfComponent,
    DailyWfComponent,
    HourlyChartsComponent,
    HourlyTempChartComponent,
    HourlyPressureChartComponent,
    HourlyHumidityChartComponent,
    HourlyDewPointChartComponent,
    HourlyUviChartComponent,
    HourlyCloudsChartComponent,
    HourlyWindSpeedChartComponent,
    HourlyPrecipitationChartComponent,
    DailyTempChartComponent,
    MinMaxWhComponent,
    BarImgWhComponent,
    HistoricalChartsComponent,
    WhTempChartComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    NgReplacePipeModule,
    FlexModule,
    BrowserAnimationsModule,
    LeafletModule,
    HttpClientModule,
    AppRoutingModule,
    NgJoinPipeModule,
    NgRoundPipeModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pl'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
