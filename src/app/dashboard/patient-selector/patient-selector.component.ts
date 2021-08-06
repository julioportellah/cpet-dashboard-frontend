import { Component, OnInit } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';

interface Sessions {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-patient-selector',
  templateUrl: './patient-selector.component.html',
  styleUrls: ['./patient-selector.component.css']
})
export class PatientSelectorComponent implements OnInit {
  sessions: Sessions[] = [
    {value: '48', viewValue: '48'},
    {value: '49', viewValue: '49'},
    {value: '50', viewValue: '50'}
  ];

  constructor() { }

  ngOnInit(): void {
  }
  SelectSession(selectedSession:any){
    console.log(selectedSession)
  }

}

