import { Component,Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartType, Row } from "angular-google-charts"

@Component({
  selector: 'app-google-chart-test',
  templateUrl: './google-chart-test.component.html',
  styleUrls: ['./google-chart-test.component.css']
})
export class GoogleChartTestComponent implements OnInit, OnChanges {
  @Input('chart-values') chartDataValue: any =[[40, 0, 0, 0]];
  options = {
    width: 600,
    height: 350,
    vAxis: {minValue:0, maxValue:100},
    hAxis: {minValue:40, maxValue:100},
    animation: {
      duration: 1000,
      easing: 'in'
    },
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    is3D: true
  };
  chartType:any = 'LineChart';
  columnNames = ["%", "Cardiac", "Pulmonary","Other"];
  chartData = [[40, 0, 0, 0]];
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.chartDataValue);
  }

  ngOnInit(): void {
  }

}
