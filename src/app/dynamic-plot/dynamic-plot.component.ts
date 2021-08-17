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
  isPlaying=false;
  timeData:any;
  cardiacScores:any;
  pulmonaryScores:any;
  otherScores:any;
  valuesIndex:number=0;
  ngOnInit(): void {
    this.updateIndex();
  }

  updateIndex(): void {
    setInterval(() => {         //replaced function() by ()=>
      if (this.isPlaying){
        this.valuesIndex++;
        if (this.valuesIndex >=7)
          this.valuesIndex = 0;
      }
      console.log(this.valuesIndex); // just testing if it is working
    }, 1000);
}

  playDynamicRadar() {
    this.isPlaying = true;
  }

  pauseDynamicRadar() {
    this.isPlaying = false;
  }


  onSelected(selected:string){
    console.log(selected)
    var results = this.cpetService.getAllTimesSessionScores(selected);
    this.showDynamicPlots =  results != null;
    if (this.showDynamicPlots)
    {
      this.timeData=results.Time;
      this.cardiacScores = results.CardiacScores;
      this.pulmonaryScores = results.PulmonaryScores;
      this.otherScores = results.OtherScores;
      console.log(this.otherScores);
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
