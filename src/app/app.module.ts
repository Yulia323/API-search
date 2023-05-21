import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppService} from './core/services/app.services';
import {NgChartsModule} from 'ng2-charts';
import {ChartComponent} from './components/chart/chart.component';
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    NgChartsModule,
    MatInputModule
  ],
  providers: [
    HttpClient,
    AppService,
    ChartComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
