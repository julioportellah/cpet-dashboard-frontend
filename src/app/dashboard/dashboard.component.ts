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
  constructor(private cpetService: CpetService, public dialog: MatDialog) { }

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
    var results = this.cpetService.getSessionScores(selected);
    this.cardiacValue = results[0];
    this.pulmonaryValue = results[1];
    this.otherValue = results[2];
  }
}
