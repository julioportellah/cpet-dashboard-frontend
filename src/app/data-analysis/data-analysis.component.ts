import { Component, OnInit } from '@angular/core';
import { CpetService } from '../service/cpet.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientForm } from '../models/patient-form.model';

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {
  cardiacScores: any=[];
  pulmonaryScores: any=[];
  otherScores: any=[];
  valuesIndex: any = 0;
  cardiacScoresFull: any;
  pulmonaryScoresFull: any;
  otherScoresFull: any;
  radarCardiacValue: any = 0;
  radarPulmonaryValue: any = 0;
  radarOtherValue: any = 0;
  ProgressText:string= "Radar plot at 40% of the session";
  performanceData:any;
  radarReferencesCardiac:number=0;
  radarReferencesPulmonary:number=0;
  radarReferencesOther:number=0;
  showDynamicPlots = false;
  isPlaying = false;
  timeData: any;
  timeValue: any = 0;
  chartValue = [[40,0,0,0]]
  temporalChartValue = [[40,0,0,0]]

  constructor(private cpetService: CpetService, public dialog: MatDialog) { }

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
  submitData(patientForm: PatientForm) {
    console.log("*****************");
    console.log(patientForm);
    console.log("*****************");

    this.cpetService.analyzePatientData(patientForm).then(
      answer => {
        console.log("---------------");
        console.log(answer);
        this.showDynamicPlots = answer != null;
        if (this.showDynamicPlots)
        {
          this.timeData = answer?.Time;
          this.cardiacScoresFull = answer?.CardiacScores;
          this.pulmonaryScoresFull = answer?.PulmonaryScores;
          this.otherScoresFull = answer?.OtherScores;
          this.radarReferencesCardiac = 0;
          this.radarReferencesPulmonary = 0;
          this.radarReferencesOther = 0;
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
          console.log("---------------");
          console.log(this.cardiacScoresFull);
        }
      }
    );

  }
}
