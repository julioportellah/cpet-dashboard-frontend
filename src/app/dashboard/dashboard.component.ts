import { Component, OnInit } from '@angular/core';
import { CpetService } from '../service/cpet.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ExplanationModalComponent } from './explanation-modal/explanation-modal.component';

export interface DialogData {
  session: string;
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
  constructor(private cpetService: CpetService, public dialog: MatDialog) { 
    let selectedSession =sessionStorage.getItem('selectedSession');
    if(selectedSession!=null)
    {
      this.onSelected(selectedSession.toString());
    }
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ExplanationModalComponent, {
      data: {session: this.sessionSelected}
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

  onSelected(selected:string){
    this.sessionSelected = selected;
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
  }
}
