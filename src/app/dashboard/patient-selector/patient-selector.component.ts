import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-patient-selector',
  templateUrl: './patient-selector.component.html',
  styleUrls: ['./patient-selector.component.css']
})
export class PatientSelectorComponent implements OnInit {
  foods: Food[] = [
    {value: '48', viewValue: '48'},
    {value: '49', viewValue: '49'},
    {value: '50', viewValue: '50'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
