import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgApexchartsModule } from "ng-apexcharts";
import { RadarPlotComponent } from './dashboard/radar-plot/radar-plot.component';
import { DescriptionPlotsComponent } from './dashboard/description-plots/description-plots.component';
import { PatientSelectorComponent } from './dashboard/patient-selector/patient-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { ExplanationModalComponent } from './dashboard/explanation-modal/explanation-modal.component';
import { DynamicPlotComponent } from './dynamic-plot/dynamic-plot.component';
import { ScoreTimelineComponent } from './dynamic-plot/score-timeline/score-timeline.component';
import { DynamicRadarPlotComponent } from './dynamic-plot/dynamic-radar-plot/dynamic-radar-plot.component';
import { PerformancePlotComponent } from './dynamic-plot/performance-plot/performance-plot.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    DashboardComponent,
    RadarPlotComponent,
    DescriptionPlotsComponent,
    PatientSelectorComponent,
    ExplanationModalComponent,
    DynamicPlotComponent,
    ScoreTimelineComponent,
    DynamicRadarPlotComponent,
    PerformancePlotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    HttpClientModule,
    GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
