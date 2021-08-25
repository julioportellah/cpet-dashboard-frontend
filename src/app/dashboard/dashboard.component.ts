import { Component, OnInit } from '@angular/core';
import { CpetService } from '../service/cpet.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ExplanationModalComponent } from './explanation-modal/explanation-modal.component';

export interface DialogData {
  session: string;
  shapImage: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sessionSelected = "";
  cardiacValue = 0;
  pulmonaryValue = 0;
  otherValue = 0;
  image_base64_cardiac:string="";
  image_base64_pulmonary:string="";
  image_base64_other:string="";
  constructor(private cpetService: CpetService, public dialog: MatDialog) { 
    let selectedSession =sessionStorage.getItem('selectedSession');
    if(selectedSession!=null)
    {
      this.onSelected(selectedSession.toString());
    }
  }

  ngOnInit(): void {
  }

  openDialogCardiac():void{
    this.openDialog('cardiac', this.image_base64_cardiac);
  }

  openDialogPulmonary():void{
    this.openDialog('pulmonary', this.image_base64_cardiac);
  }

  openDialogOther():void{
    this.openDialog('other', this.image_base64_cardiac);
  }

  openDialog(limitation_mode:string, image_string:string): void {
    const dialogRef = this.dialog.open(ExplanationModalComponent, {
      data: {session: this.sessionSelected, shapImage: image_string}
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }


  onSelected(selected:string){
    this.sessionSelected = selected;
    console.log(this.sessionSelected);
    // this.cpetService.getSessionScoresById(selected).then(answer =>{
    //   this.cardiacValue = answer[0];
    //   this.pulmonaryValue = answer[1];
    //   this.otherValue = answer[2];
    // });
    this.cpetService.getSessionScoresByIdAsync(selected).then(answer => {
      this.cardiacValue = answer[0];
      this.pulmonaryValue = answer[1];
      this.otherValue = answer[2];
    })

    this.cpetService.getCardiacSummaryPlotAsync(this.sessionSelected).then(answer => {
      console.log(answer)
      this.image_base64_cardiac = answer;
    })
    // this.cpetService.getPulmonarySummaryPlotAsync(this.sessionSelected).then(answer => {
    //   console.log(answer)
    //   this.image_base64_pulmonary = answer;
    // })
    // this.cpetService.getOtherSummaryPlotAsync(this.sessionSelected).then(answer => {
    //   console.log(answer)
    //   this.image_base64_other = answer;
    // })
  }
}
