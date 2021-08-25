import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../dashboard.component';

@Component({
  selector: 'app-explanation-modal',
  templateUrl: './explanation-modal.component.html',
  styleUrls: ['./explanation-modal.component.css']
})
export class ExplanationModalComponent implements OnInit {
  // @Input('session') session: string ="0";
  // @Input('pulmonary-value') pulmonaryValue: number=0;
  imageUrl:string="../../../assets/cardiac_waterfall_sample.png";
  constructor(
    public dialogRef: MatDialogRef<ExplanationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
     }
  
  ngOnInit(): void {
    // will log the entire data object
    console.log(this.data)
    this.imageUrl = 'data:image/jpeg;base64,' + this.data.shapImage;
  }

}
