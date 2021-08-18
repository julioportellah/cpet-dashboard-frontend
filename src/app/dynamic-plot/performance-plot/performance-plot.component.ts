import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CpetService } from '../../service/cpet.service';
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
  selector: 'app-performance-plot',
  templateUrl: './performance-plot.component.html',
  styleUrls: ['./performance-plot.component.css']
})
export class PerformancePlotComponent{
  @Input('cardiac-aucs') cardiacScores: any =[79, 85, 86, 87, 84, 96, 98];
  @Input('pulmonary-aucs') pulmonaryScores: any=[95, 92, 89, 89, 93, 97, 90];
  @Input('other-aucs') otherScores: any=[78, 92, 94, 93, 89, 97, 96];
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>| any;

  constructor(private cpetService: CpetService) { 
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
        text: "Models' AUC scores over the percent of the session",
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
          text: "AUC score"
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
