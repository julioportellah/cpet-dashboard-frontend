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
  valuesIndex: any = 0;
  radarCardiacValue: any = 0;
  radarPulmonaryValue: any = 0;
  radarOtherValue: any = 0;
  radarReferencesCardiac: any = 0;
  radarReferencesPulmonary: any = 0;
  radarReferencesOther: any = 0;
  timeValue: any = 0;

  constructor(private cpetService: CpetService) {
    //this.performanceData = cpetService.getPerformanceData();
    // this.cardiacScores = this.performanceData.CardiacBestAUC;
    // this.pulmonaryPerformance = this.performanceData.PulmonaryBestAUC;
    // this.otherPerformance = this.performanceData.OtherBestAUC;
    let selectedSession =sessionStorage.getItem('selectedSession');
    if(selectedSession!=null)
    {
      this.onSelected(selectedSession.toString());
    }
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
      this.temporalChartValue = this.chartValue.slice(0, this.valuesIndex + 1);
      this.timeValue = this.timeData[this.valuesIndex];
      let timeScores = this.timeData.slice(0, this.valuesIndex + 1);
      this.cardiacScores=this.cardiacScoresFull.slice(0, this.valuesIndex+1);
      this.pulmonaryScores=this.pulmonaryScoresFull.slice(0, this.valuesIndex+1);
      this.otherScores=this.otherScoresFull.slice(0, this.valuesIndex+1);
      this.ProgressText = "Radar plot at "+this.timeValue.toString()+"% of the session";
      this.radarCardiacValue = this.cardiacScoresFull[this.valuesIndex]
      this.radarPulmonaryValue = this.pulmonaryScoresFull[this.valuesIndex]
      this.radarOtherValue = this.otherScoresFull[this.valuesIndex]
      
    }
  }

  showPrevious() {
    if (this.valuesIndex > 0)
    {
      this.valuesIndex--;
      this.temporalChartValue = this.chartValue.slice(0, this.valuesIndex + 1);
      this.timeValue = this.timeData[this.valuesIndex];
      this.cardiacScores=this.cardiacScoresFull.slice(0, this.valuesIndex+1);
      this.pulmonaryScores=this.pulmonaryScoresFull.slice(0, this.valuesIndex+1);
      this.otherScores=this.otherScoresFull.slice(0, this.valuesIndex+1);
      this.ProgressText = "Radar plot at "+this.timeValue.toString()+"% of the session";
      this.radarCardiacValue = this.cardiacScoresFull[this.valuesIndex]
      this.radarPulmonaryValue = this.pulmonaryScoresFull[this.valuesIndex]
      this.radarOtherValue = this.otherScoresFull[this.valuesIndex]
    }
  }

  showNext(){
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
    this.chartValue = [[40,0,0,0]]
    this.temporalChartValue = [[40,0,0,0]]
    this.radarCardiacValue = 0;
    this.radarPulmonaryValue = 0;
    this.radarOtherValue = 0;
    this.cpetService.getAllTimesSessionScoresByIdAsync(selected).then(
      answer => {
        this.showDynamicPlots = answer != null;
        if (this.showDynamicPlots)
        {
          this.timeData = answer?.Time;
          this.cardiacScoresFull = answer?.CardiacScores;
          this.pulmonaryScoresFull = answer?.PulmonaryScores;
          this.otherScoresFull = answer?.OtherScores;
          this.radarReferencesCardiac = answer?.RealCardiacLim;
          this.radarReferencesPulmonary = answer?.RealPulmonaryLim;
          this.radarReferencesOther = answer?.RealOtherLim;
          this.valuesIndex = 0;
          this.isPlaying = false;
          this.timeValue = this.timeData[this.valuesIndex];
          this.ProgressText = "Radar plot at "+this.timeValue.toString()+"% of the session"
          this.radarCardiacValue = this.cardiacScores[this.valuesIndex]
          this.radarPulmonaryValue = this.pulmonaryScores[this.valuesIndex]
          this.radarOtherValue = this.otherScores[this.valuesIndex]
          this.timeValue = this.timeData[this.valuesIndex]
          this.chartValue = [
            [this.timeData[0], this.cardiacScoresFull[0], this.pulmonaryScoresFull[0], this.otherScoresFull[0]],
            [this.timeData[1], this.cardiacScoresFull[1], this.pulmonaryScoresFull[1], this.otherScoresFull[1]],
            [this.timeData[2], this.cardiacScoresFull[2], this.pulmonaryScoresFull[2], this.otherScoresFull[2]],
            [this.timeData[3], this.cardiacScoresFull[3], this.pulmonaryScoresFull[3], this.otherScoresFull[3]],
            [this.timeData[4], this.cardiacScoresFull[4], this.pulmonaryScoresFull[4], this.otherScoresFull[4]],
            [this.timeData[5], this.cardiacScoresFull[5], this.pulmonaryScoresFull[5], this.otherScoresFull[5]],
            [this.timeData[6], this.cardiacScoresFull[6], this.pulmonaryScoresFull[6], this.otherScoresFull[6]],
          ]
          this.temporalChartValue = this.chartValue.slice(0, this.valuesIndex + 1);
        }
      }
    );

    // this.cpetService.getAllTimesSessionScoresById(selected).then(answer =>{
    //   this.showDynamicPlots = answer != null;
    //   if (this.showDynamicPlots)
    //   {
    //     this.timeData = answer?.Time;
    //     this.cardiacScoresFull = answer?.CardiacScores;
    //     this.pulmonaryScoresFull = answer?.PulmonaryScores;
    //     this.otherScoresFull = answer?.OtherScores;
    //     this.radarReferencesCardiac = answer?.RealCardiacLim;
    //     this.radarReferencesPulmonary = answer?.RealPulmonaryLim;
    //     this.radarReferencesOther = answer?.RealOtherLim;
    //     this.valuesIndex = 0;
    //     this.isPlaying = false;
    //     this.timeValue = this.timeData[this.valuesIndex];
    //     this.ProgressText = "Radar plot at "+this.timeValue.toString()+"% of the session"
    //     this.radarCardiacValue = this.cardiacScores[this.valuesIndex]
    //     this.radarPulmonaryValue = this.pulmonaryScores[this.valuesIndex]
    //     this.radarOtherValue = this.otherScores[this.valuesIndex]
    //     this.timeValue = this.timeData[this.valuesIndex]
    //     this.chartValue = [
    //       [this.timeData[0], this.cardiacScoresFull[0], this.pulmonaryScoresFull[0], this.otherScoresFull[0]],
    //       [this.timeData[1], this.cardiacScoresFull[1], this.pulmonaryScoresFull[1], this.otherScoresFull[1]],
    //       [this.timeData[2], this.cardiacScoresFull[2], this.pulmonaryScoresFull[2], this.otherScoresFull[2]],
    //       [this.timeData[3], this.cardiacScoresFull[3], this.pulmonaryScoresFull[3], this.otherScoresFull[3]],
    //       [this.timeData[4], this.cardiacScoresFull[4], this.pulmonaryScoresFull[4], this.otherScoresFull[4]],
    //       [this.timeData[5], this.cardiacScoresFull[5], this.pulmonaryScoresFull[5], this.otherScoresFull[5]],
    //       [this.timeData[6], this.cardiacScoresFull[6], this.pulmonaryScoresFull[6], this.otherScoresFull[6]],
    //     ]
    //   }
    // });
  }
}
