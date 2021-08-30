import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataAnalysisComponent } from './data-analysis/data-analysis.component';
import { DynamicPlotComponent } from './dynamic-plot/dynamic-plot.component';

const routes: Routes = [
  { path: 'About', component: AboutComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'DynamicPlot', component: DynamicPlotComponent },
  { path: 'DataAnalysis', component: DataAnalysisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
