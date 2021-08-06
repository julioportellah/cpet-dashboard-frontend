import { Component, ViewChild } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ApexFill,
  ApexDataLabels,
  ChartComponent,
  ApexStroke,
  ApexPlotOptions,
  ApexYAxis,
  ApexMarkers
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  tooltip: any;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
  yaxis: ApexYAxis;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-radar-plot',
  templateUrl: './radar-plot.component.html',
  styleUrls: ['./radar-plot.component.css']
})
export class RadarPlotComponent{
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> |any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Series 1",
          data: [35.6, 90, 40]
        }
      ],
      chart: {
        height: 350,
        type: "radar"
      },
      dataLabels: {
        enabled: true
      },
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            strokeColor: "#e9e9e9",
            fill: {
              colors: ["#f8f8f8", "#fff"]
            }
          }
        }
      },
      title: {
        text: "Primary Limitation by origin"
      },
      colors: ["#FF4560"],
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColors: ["#FF4560"],
        strokeWidth: 2
      },
      tooltip: {
        y: {
          formatter: function(val:any) {
            return val;
          }
        }
      },
      xaxis: {
        categories: [
          "Cardiac",
          "Pulmonary",
          "Other",
        ]
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: function(val:any, i:any) {
            if (i % 2 === 0) {
              return val;
            } else {
              return "";
            }
          }
        }
      }
    };
   }


}
