import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../dashboard.component';

@Component({
  selector: 'app-explanation-modal',
  templateUrl: './explanation-modal.component.html',
  styleUrls: ['./explanation-modal.component.css']
})
export class ExplanationModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ExplanationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
     }

  ngOnInit(): void {
  }

}
