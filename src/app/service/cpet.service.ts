import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CpetService implements OnInit {
  products:any;
  dynamicData: any;
  sessionNumber:number;
  // constructor(private http: HttpClient) { 
  //   this.data = this.http.get("./assets/data.json");
  // }
  constructor(private httpClient: HttpClient){
    this.httpClient.get("assets/data.json").subscribe(data =>{
      this.products = data;
    })
    this.httpClient.get("assets/data/data_dynamic.json").subscribe(data =>{
      this.dynamicData = data;
    })
  }

  ngOnInit(){
    this.httpClient.get("assets/data.json").subscribe(data =>{
      this.products = data;
    })
    this.httpClient.get("assets/data/data_dynamic.json").subscribe(data =>{
      this.dynamicData = data;
    })
  }

  getAllSessions():any{
    return this.products.SessionId;
  }

  getSessionScores(session:string):[number,number,number]{
    if (session == '')
      return [0,0,0]
    this.sessionNumber = parseInt(session);
    return [this.products.CardiacProba[this.sessionNumber],
            this.products.PulmonaryProba[this.sessionNumber],
            this.products.OtherProba[this.sessionNumber]]
  }

  getAllTimesSessionScores(session: string):any{
    if (session == '')
      return null;
    this.sessionNumber = parseInt(session);
    return {
      "Patient": this.dynamicData.PatientId[this.sessionNumber],
      "SessionId": this.dynamicData.SessionId[this.sessionNumber],
      "RealCardiacLim": this.dynamicData.CardiacLim[this.sessionNumber]*100,
      "RealPulmonaryLim": this.dynamicData.PulmonaryLim[this.sessionNumber]*100,
      "RealOtherLim": this.dynamicData.OtherLim[this.sessionNumber]*100,
      "Time": [40, 50, 60, 80, 90, 100],
      "CardiacScores": [
        Math.round(this.dynamicData.CardiacLimProba40[this.sessionNumber]*100),
        Math.round(this.dynamicData.CardiacLimProba50[this.sessionNumber]*100),
        Math.round(this.dynamicData.CardiacLimProba60[this.sessionNumber]*100),
        Math.round(this.dynamicData.CardiacLimProba70[this.sessionNumber]*100),
        Math.round(this.dynamicData.CardiacLimProba80[this.sessionNumber]*100),
        Math.round(this.dynamicData.CardiacLimProba90[this.sessionNumber]*100),
        Math.round(this.dynamicData.CardiacLimProba100[this.sessionNumber]*100)
      ],
      "PulmonaryScores": [
        Math.round(this.dynamicData.PulmonaryLimProba40[this.sessionNumber]*100),
        Math.round(this.dynamicData.PulmonaryLimProba50[this.sessionNumber]*100),
        Math.round(this.dynamicData.PulmonaryLimProba60[this.sessionNumber]*100),
        Math.round(this.dynamicData.PulmonaryLimProba70[this.sessionNumber]*100),
        Math.round(this.dynamicData.PulmonaryLimProba80[this.sessionNumber]*100),
        Math.round(this.dynamicData.PulmonaryLimProba90[this.sessionNumber]*100),
        Math.round(this.dynamicData.PulmonaryLimProba100[this.sessionNumber]*100)
      ],
      "OtherScores": [
        Math.round(this.dynamicData.OtherLimProba40[this.sessionNumber]*100),
        Math.round(this.dynamicData.OtherLimProba50[this.sessionNumber]*100),
        Math.round(this.dynamicData.OtherLimProba60[this.sessionNumber]*100),
        Math.round(this.dynamicData.OtherLimProba70[this.sessionNumber]*100),
        Math.round(this.dynamicData.OtherLimProba80[this.sessionNumber]*100),
        Math.round(this.dynamicData.OtherLimProba90[this.sessionNumber]*100),
        Math.round(this.dynamicData.OtherLimProba100[this.sessionNumber]*100)
      ]
    }
  }
}
