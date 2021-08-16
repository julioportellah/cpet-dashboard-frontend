import { Component, OnInit } from '@angular/core';
import { CpetService } from '../service/cpet.service';

@Component({
  selector: 'app-dynamic-plot',
  templateUrl: './dynamic-plot.component.html',
  styleUrls: ['./dynamic-plot.component.css']
})
export class DynamicPlotComponent implements OnInit {
  constructor(private cpetService: CpetService) { }
  showDynamicPlots=false;
  timeData:any;
  ngOnInit(): void {
  }

  onSelected(selected:string){
    console.log(selected)
    var results = this.cpetService.getAllTimesSessionScores(selected);
    this.showDynamicPlots =  results != null;
    if (this.showDynamicPlots)
    {
      this.timeData=results.Time
      console.log(this.timeData);
    }
      
    // this.sessionSelected = selected;
    // var results = this.cpetService.getSessionScores(selected);
    // this.cardiacValue = results[0];
    // this.pulmonaryValue = results[1];
    // this.otherValue = results[2];
    // console.log(this.cardiacValue)
    // console.log('parent'+this.sessionSelected);
  }
}
