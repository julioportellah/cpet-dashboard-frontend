import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

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
  selector: 'app-dynamic-radar-plot',
  templateUrl: './dynamic-radar-plot.component.html',
  styleUrls: ['./dynamic-radar-plot.component.css']
})
export class DynamicRadarPlotComponent implements OnChanges {
  @Input('cardiac-value') cardiacValue: number =0;
  @Input('pulmonary-value') pulmonaryValue: number=0;
  @Input('other-value') otherValue: number=0;
  @Input('reference-cardiac-value') referenceCardiacValue: number =0;
  @Input('reference-pulmonary-value') referencePulmonaryValue: number=0;
  @Input('reference-other-value') referenceOtherValue: number=0;
  @ViewChild("chart") chart: ChartComponent;
  seriesData: any = [0, 0, 0];
  actualResult: string = "";


  public chartOptions: Partial<ChartOptions> | any;
  constructor() { 
    this.seriesData={
        name: "Actual Score",
        data: [0, 0, 0]
      };
    this.chartOptions = {
      series: [
        {
          name: "Actual Score",
          data: [0, 0, 0]
        },
        {
          name: "Models' Score",
          data: [0, 0, 0]
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
      colors: ["#FF4560",'#1BABFF'],
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColors: ["#FF4560"],
        strokeWidth: 2
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
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
        max: 100,
        tickAmount: 5,
        labels: {
          formatter: function (val: any, i: any) {
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

  ngOnChanges(changes: SimpleChanges){
    if(this.cardiacValue==undefined)
    {
      this.cardiacValue=0;
      this.pulmonaryValue=0;
      this.otherValue=0;
    }
    this.chartOptions.series = [{
      data: [this.cardiacValue, this.pulmonaryValue, this.otherValue]
    }];
    let sumResult = 0;
    sumResult = this.referenceCardiacValue + 2 * this.referencePulmonaryValue + 3 * this.referenceOtherValue;

    this.actualResult = "Actual limitation: None"
    if(sumResult == 100)
      this.actualResult = "Actual limitation: Cardiac";
    else if(sumResult== 200)
      this.actualResult = "Actual limitation: Cardiac";
    else if(sumResult == 300)
      this.actualResult = "Actual limitation: Other origin";
    else
      this.actualResult = "Actual limitation: None";
      
    // this.chartOptions.series={
    //   name: "Actual Score",
    //   data: [this.cardiacValue, this.pulmonaryValue, this.otherValue]
    // };
    //this.seriesData = [this.cardiacValue, this.pulmonaryValue, this.otherValue]
    // this.chartOptions = {
    //   series: [
    //     {
    //       name: "Actual Score",
    //       data: [this.referenceCardiacValue, this.referencePulmonaryValue, this.referenceOtherValue]
    //     },
    //     {
    //       name: "Models' Score",
    //       data: [this.cardiacValue, this.pulmonaryValue, this.otherValue]
    //     }
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "radar"
    //   },
    //   dataLabels: {
    //     enabled: true
    //   },
    //   plotOptions: {
    //     radar: {
    //       size: 140,
    //       polygons: {
    //         strokeColor: "#e9e9e9",
    //         fill: {
    //           colors: ["#f8f8f8", "#fff"]
    //         }
    //       }
    //     }
    //   },
    //   title: {
    //     text: "Primary Limitation by origin"
    //   },
    //   colors: ["#FF4560",'#1BABFF'],
    //   markers: {
    //     size: 4,
    //     colors: ["#fff"],
    //     strokeColors: ["#FF4560"],
    //     strokeWidth: 2
    //   },
    //   tooltip: {
    //     y: {
    //       formatter: function (val: any) {
    //         return val;
    //       }
    //     }
    //   },
    //   xaxis: {
    //     categories: [
    //       "Cardiac",
    //       "Pulmonary",
    //       "Other",
    //     ]
    //   },
    //   yaxis: {
    //     max: 100,
    //     tickAmount: 5,
    //     labels: {
    //       formatter: function (val: any, i: any) {
    //         if (i % 2 === 0) {
    //           return val;
    //         } else {
    //           return "";
    //         }
    //       }
    //     }
    //   }
    // };
  }
}
