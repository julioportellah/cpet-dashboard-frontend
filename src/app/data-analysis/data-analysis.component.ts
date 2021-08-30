import { Component, OnInit } from '@angular/core';
import { PatientForm } from '../models/patient-form.model';

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submitData(patientForm: PatientForm) {
    console.log("*****************");
    console.log(patientForm);
    console.log("*****************");
  }
}
