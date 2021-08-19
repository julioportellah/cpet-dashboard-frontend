import { Component, OnInit } from '@angular/core';
import { CpetService } from '../service/cpet.service';

@Component({
  selector: 'app-dynamic-plot',
  templateUrl: './dynamic-plot.component.html',
  styleUrls: ['./dynamic-plot.component.css']
})
export class DynamicPlotComponent implements OnInit {
  ProgressText:string= "Radar plot at 40% of the session";
  performanceData:any;
  showDynamicPlots = false;
  isPlaying = false;
  timeData: any;
  cardiacPerformance:any=[0,0,0,0,0,0,0];
  pulmonaryPerformance:any=[0,0,0,0,0,0,0];
  otherPerformance:any=[0,0,0,0,0,0,0];
  cardiacScoresFull: any;
  pulmonaryScoresFull: any;
  otherScoresFull: any;
  cardiacScores: any=[];
  pulmonaryScores: any=[];
  otherScores: any=[];
  valuesIndex: number = 0;
  radarCardiacValue: number = 0;
  radarPulmonaryValue: number = 0;
  radarOtherValue: number = 0;
  radarReferencesCardiac: number = 0;
  radarReferencesPulmonary: number = 0;
  radarReferencesOther: number = 0;
  timeValue: number = 0;

  constructor(private cpetService: CpetService) {
    //this.performanceData = cpetService.getPerformanceData();
    // this.cardiacScores = this.performanceData.CardiacBestAUC;
    // this.pulmonaryPerformance = this.performanceData.PulmonaryBestAUC;
    // this.otherPerformance = this.performanceData.OtherBestAUC;
  }

  ngOnInit(): void {
    this.updateIndex();
  }

  updateIndex(): void {
    setInterval(() => {
      if (this.isPlaying) {
        this.updateValueIndex();
      }
    }, 1500);
  }
  

  private updateValueIndex()
  {
    if (this.valuesIndex <= 5)
    {
      this.valuesIndex++;
      this.radarCardiacValue = this.cardiacScoresFull[this.valuesIndex]
      this.radarPulmonaryValue = this.pulmonaryScoresFull[this.valuesIndex]
      this.radarOtherValue = this.otherScoresFull[this.valuesIndex]
      this.timeValue = this.timeData[this.valuesIndex];
      let timeScores = this.timeData.slice(0, this.valuesIndex + 1);
      this.temporalChartValue = this.chartValue.slice(0, this.valuesIndex + 1);
      this.cardiacScores=this.cardiacScoresFull.slice(0, this.valuesIndex+1);
      this.pulmonaryScores=this.pulmonaryScoresFull.slice(0, this.valuesIndex+1);
      this.otherScores=this.otherScoresFull.slice(0, this.valuesIndex+1);
      this.ProgressText = "Radar plot at "+this.timeValue.toString()+"% of the session";
      
      // for (let i = 0; i < this.valuesIndex+1; i++) {
      //   result.append
      // }
      console.log(this.chartValue.slice(0, this.valuesIndex+1))
      let data= [
        ["Jan",  500, 600],
        ["Feb",  800, 900],
        ["Mar",  400, 600],
        ["Apr",  600, 500],
        ["May",  400, 300],
        ["Jun",  750, 700],
        ["Jul",  800, 710],
        ["Aug",  810, 720],
        ["Sep",  820, 730],
        ["Oct",  900, 840],
        ["Nov",  910, 850],
        ["Dec",  920, 890]
     ];
     console.log(data);
    }
  }

  showPrevious() {
    if (this.valuesIndex > 0)
    {
      this.valuesIndex--;
      this.radarCardiacValue = this.cardiacScoresFull[this.valuesIndex]
      this.radarPulmonaryValue = this.pulmonaryScoresFull[this.valuesIndex]
      this.radarOtherValue = this.otherScoresFull[this.valuesIndex]
      this.timeValue = this.timeData[this.valuesIndex];
      this.cardiacScores=this.cardiacScoresFull.slice(0, this.valuesIndex+1);
      this.pulmonaryScores=this.pulmonaryScoresFull.slice(0, this.valuesIndex+1);
      this.otherScores=this.otherScoresFull.slice(0, this.valuesIndex+1);
      this.ProgressText = "Radar plot at "+this.timeValue.toString()+"% of the session"
      this.temporalChartValue = this.chartValue.slice(0, this.valuesIndex + 1);
      console.log([this.cardiacScores, this.pulmonaryScores, this.otherScores])
    }
  }

  showNext(){
    console.log("test")
    this.updateValueIndex();
  }

  playDynamicRadar() {
    this.isPlaying = true;
  }

  pauseDynamicRadar() {
    this.isPlaying = false;
  }

  replayDynamicRadar(){
    this.isPlaying = true;
    this.valuesIndex = -1;
  }

  chartValue = [[40,0,0,0]]
  temporalChartValue = [[40,0,0,0]]
  onSelected(selected: string) {
    var results = this.cpetService.getAllTimesSessionScores(selected);
    this.showDynamicPlots = results != null;
    if (this.showDynamicPlots) {
      this.timeData = results.Time;
      // this.cardiacScores = results.CardiacScores;
      // this.pulmonaryScores = results.PulmonaryScores;
      // this.otherScores = results.OtherScores;
      this.cardiacScoresFull = results.CardiacScores;
      this.pulmonaryScoresFull = results.PulmonaryScores;
      this.otherScoresFull = results.OtherScores;
      this.radarReferencesCardiac = results.RealCardiacLim;
      this.radarReferencesPulmonary = results.RealPulmonaryLim;
      this.radarReferencesOther = results.RealOtherLim;
      this.valuesIndex = 0;
      this.isPlaying = false;
      this.timeValue = this.timeData[this.valuesIndex];
      this.ProgressText = "Radar plot at "+this.timeValue.toString()+"% of the session"
      this.radarCardiacValue = this.cardiacScores[this.valuesIndex]
      this.radarPulmonaryValue = this.pulmonaryScores[this.valuesIndex]
      this.radarOtherValue = this.otherScores[this.valuesIndex]
      this.timeValue = this.timeData[this.valuesIndex]
      console.log('***************')
      console.log(this.cardiacScoresFull)
      this.chartValue = [
        [this.timeData[0], this.cardiacScoresFull[0], this.pulmonaryScoresFull[0], this.otherScoresFull[0]],
        [this.timeData[1], this.cardiacScoresFull[1], this.pulmonaryScoresFull[1], this.otherScoresFull[1]],
        [this.timeData[2], this.cardiacScoresFull[2], this.pulmonaryScoresFull[2], this.otherScoresFull[2]],
        [this.timeData[3], this.cardiacScoresFull[3], this.pulmonaryScoresFull[3], this.otherScoresFull[3]],
        [this.timeData[4], this.cardiacScoresFull[4], this.pulmonaryScoresFull[4], this.otherScoresFull[4]],
        [this.timeData[5], this.cardiacScoresFull[5], this.pulmonaryScoresFull[5], this.otherScoresFull[5]],
        [this.timeData[6], this.cardiacScoresFull[6], this.pulmonaryScoresFull[6], this.otherScoresFull[6]],
      ]
      console.log(this.chartValue)
    }
  }
}
