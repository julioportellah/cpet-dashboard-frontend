import { Component,Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartType, Row } from "angular-google-charts"

@Component({
  selector: 'app-google-chart-test',
  templateUrl: './google-chart-test.component.html',
  styleUrls: ['./google-chart-test.component.css']
})
export class GoogleChartTestComponent implements OnInit, OnChanges {
  @Input('chart-values') chartDataValue: any =[[40, 0, 0, 0]];
  mainTitle:string = "Models' scores over the percent of the session";
  options = {
    width: 600,
    height: 350,
    vAxis: {minValue:0, maxValue:100, title:"Odds of a limitation"},
    hAxis: {minValue:40, maxValue:100, title: "% of the CPET session"},
    animation: {
      duration: 1000,
      easing: 'in'
    },
    colors: ["#D13A1A","#77B6EA", "#545454"],
    series:{0: { lineDashStyle: [0,0] },
    1: { lineDashStyle: [8, 8] },
    2: { lineDashStyle: [2, 2, 20, 2, 20, 2] },},
    is3D: true
  };//["#77B6EA", "#545454",'#D13A1A'],
  chartType:any = 'LineChart';
  columnNames = ["%", "Cardiac", "Pulmonary","Other"];
  chartData = [[40, 0, 0, 0]];
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

}
