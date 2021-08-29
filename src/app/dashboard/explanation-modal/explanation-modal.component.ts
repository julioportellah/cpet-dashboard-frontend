import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../dashboard.component';

@Component({
  selector: 'app-explanation-modal',
  templateUrl: './explanation-modal.component.html',
  styleUrls: ['./explanation-modal.component.css']
})
export class ExplanationModalComponent implements OnInit {
  imageUrl: string = "";//"../../../assets/cardiac_waterfall_sample.png";
  forceImageUrl: string = "../../../assets/cardiac_waterfall_sample.png";
  constructor(
    public dialogRef: MatDialogRef<ExplanationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
  
  ngOnInit(): void {
    // will log the entire data object
    this.imageUrl = 'data:image/jpeg;base64,' + this.data.shapImage;
    this.forceImageUrl = 'data:image/jpeg;base64,' + this.data.forceImage;
  }

}
