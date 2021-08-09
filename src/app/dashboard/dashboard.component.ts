import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sessionSelected = "";
  constructor() { }

  ngOnInit(): void {
  }
  onSelected(selected:string){
    this.sessionSelected = selected;
    console.log('parent'+this.sessionSelected);
  }
}
