import { Component, OnInit } from '@angular/core';
import { CpetService } from '../service/cpet.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExplanationModalComponent } from './explanation-modal/explanation-modal.component';

export interface DialogData {
  session: string;
  shapImage: string;
  forceImage: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sessionSelected = "";
  showInterpretation = false;
  showLoader = false;
  cardiacValue = 0;
  pulmonaryValue = 0;
  otherValue = 0;
  image_base64_cardiac:string="";
  image_base64_pulmonary:string="";
  image_base64_other:string="";
  image_base64_force_cardiac:string="";
  image_base64_force_pulmonary:string="";
  image_base64_force_other:string="";
  constructor(private cpetService: CpetService, public dialog: MatDialog) { 
    let selectedSession =sessionStorage.getItem('selectedSession');
    if(selectedSession!=null)
    {
      this.onSelected(selectedSession.toString());
    }
  }

  ngOnInit(): void {
    this.showLoader = false;
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
      data: {session: this.sessionSelected, shapImage: image_string, forceImage: forceImageString}
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }


  onSelected(selected:string){
    this.sessionSelected = selected;
    this.showInterpretation = false;
    this.showLoader = true;
    this.cpetService.getSessionScoresByIdAsync(selected).then(answer => {
      this.cardiacValue = answer[0];
      this.pulmonaryValue = answer[1];
      this.otherValue = answer[2];
    })

    this.cpetService.getCardiacSummaryPlotAsync(this.sessionSelected).then(answer => {
      this.image_base64_cardiac = answer[0];
      this.image_base64_force_cardiac = answer[1];
      this.image_base64_pulmonary = answer[2];
      this.image_base64_force_pulmonary = answer[3];
      this.image_base64_other = answer[4];
      this.image_base64_force_other = answer[5];
      this.showInterpretation = true;
      this.showLoader = false;
    })
  }
}
