import { Component, OnInit } from '@angular/core';
import { CpetService } from '../service/cpet.service';

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
  constructor(private cpetService: CpetService) { }

  ngOnInit(): void {
  }
  onSelected(selected:string){
    this.sessionSelected = selected;
    var results = this.cpetService.getSessionScores(selected);
    this.cardiacValue = results[0];
    this.pulmonaryValue = results[1];
    this.otherValue = results[2];
    console.log(this.cardiacValue)
    console.log('parent'+this.sessionSelected);
  }
}
