import { Component, OnInit } from '@angular/core';
import { CpetService } from '../service/cpet.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientForm } from '../models/patient-form.model';
import { ExplanationModalComponent } from '../dashboard/explanation-modal/explanation-modal.component';

export interface DialogData {
  session: string;
  shapImage: string;
  forceImage: string;
}
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
  showDynamicPlots:string = "not";
  isPlaying = false;
  timeData: any;
  timeValue: any = 0;
  chartValue = [[40,0,0,0]]
  temporalChartValue = [[40,0,0,0]]
  image_base64_cardiac: string = "";
  image_base64_force_cardiac: string = "";
  image_base64_pulmonary: string = "";
  image_base64_force_pulmonary: string = "";
  image_base64_other: string = "";
  image_base64_force_other: string = "";
  constructor(private cpetService: CpetService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.updateIndex();
  }

  openDialogCardiac():void{
    this.openDialog('cardiac', this.image_base64_cardiac, this.image_base64_force_cardiac);
  }

  openDialogPulmonary():void{
    this.openDialog('pulmonary', this.image_base64_pulmonary, this.image_base64_force_pulmonary);
  }

  openDialogOther():void{
    this.openDialog('other', this.image_base64_other, this.image_base64_force_other);
  }

  openDialog(limitation_mode:string, image_string:string, forceImageString: string): void {
    const dialogRef = this.dialog.open(ExplanationModalComponent, {
      data: {session: "Patient", shapImage: image_string, forceImage: forceImageString}
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
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
    this.showDynamicPlots = "notYet";

    this.cpetService.analyzePatientData(patientForm).then(
      answer => {
        console.log("---------------");
        console.log(answer);
        this.showDynamicPlots = "done";
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
          this.image_base64_cardiac = answer?.CariacSummaryString!;
          this.image_base64_force_cardiac = answer?.CariacForcePlotString!;
          this.image_base64_pulmonary = answer?.PulmonarySummaryString!;
          this.image_base64_force_pulmonary = answer?.PulmonaryForcePlotString!;
          this.image_base64_other = answer?.OtherSummaryString!;
          this.image_base64_force_other = answer?.OtherForcePlotString!;
          console.log("---------------");
          console.log(this.cardiacScoresFull);
        }
      }
    );

  }
}
