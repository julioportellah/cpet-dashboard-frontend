import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartType, Row } from "angular-google-charts"
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-score-timeline',
  templateUrl: './score-timeline.component.html',
  styleUrls: ['./score-timeline.component.css']
})
export class ScoreTimelineComponent implements OnChanges {
  @Input('cardiac-scores') cardiacScores: any =[0,0,0,0,0,0,0];
  @Input('pulmonary-scores') pulmonaryScores: any=[0,0,0,0,0,0,0];
  @Input('other-scores') otherScores: any=[0,0,0,0,0,0,0];
  @ViewChild("chart") chart: ChartComponent;
  @ViewChild("chart") chartLine:  google.visualization.LineChart;
  public chartOptions: Partial<ChartOptions>| any;
  

  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions = {
      series: [
        {
          name: "Cardiac",
          data: this.cardiacScores
        },
        {
          name: "Pulmonary",
          data: this.pulmonaryScores
        },
        {
          name: "Other",
          data: this.otherScores
        }
      ],
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#77B6EA", "#545454",'#D13A1A'],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Models' scores over the percent of the session",
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ["40%", "50%", "60%", "70%", "80%", "90%", "100%"],
        title: {
          text: "Percent of the Session"
        }
      },
      yaxis: {
        title: {
          text: "Odds of having a limitation"
        },
        min: 0,
        max: 100
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  }

  constructor() { 
    this.chartOptions = {
      series: [
        {
          name: "Cardiac",
          data: [10,20,30,40,50,80, 90]
        },
        {
          name: "Pulmonary",
          data: [10, 15, 12, 5, 7, 0, 0]
        },
        {
          name: "Other",
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#77B6EA", "#545454",'#D13A1A'],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Models' scores over the percent of the session",
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ["40%", "50%", "60%", "70%", "80%", "90%", "100%"],
        title: {
          text: "Percent of the Session"
        }
      },
      yaxis: {
        title: {
          text: "Odds of a Limitation"
        },
        min: 0,
        max: 100
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  }


}
