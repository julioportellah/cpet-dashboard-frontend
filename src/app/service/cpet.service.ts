import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Session } from '../models/session.model';
import { SessionRaw } from '../models/session-raw.model';

@Injectable({
  providedIn: 'root'
})
export class CpetService implements OnInit {
  products:any;
  dynamicData: any;
  performanceData: any;
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
    this.httpClient.get("assets/data/performance_data.json").subscribe(data =>{
      this.performanceData = data;
    })
  }

  ngOnInit(){
    this.httpClient.get("assets/data.json").subscribe(data =>{
      this.products = data;
    })
    this.httpClient.get("assets/data/data_dynamic.json").subscribe(data =>{
      this.dynamicData = data;
    })
    this.httpClient.get("assets/data/performance_data.json").subscribe(data =>{
      this.performanceData = data;
    })
  }

  getPerformanceData():any{
    return {
      "Time": [40, 50, 60, 80, 90, 100],
      "CardiacBestAUC": [
        Math.round(this.performanceData.CardiacBestAUC[6]*100),
        Math.round(this.performanceData.CardiacBestAUC[5]*100),
        Math.round(this.performanceData.CardiacBestAUC[4]*100),
        Math.round(this.performanceData.CardiacBestAUC[3]*100),
        Math.round(this.performanceData.CardiacBestAUC[2]*100),
        Math.round(this.performanceData.CardiacBestAUC[1]*100),
        Math.round(this.performanceData.CardiacBestAUC[0]*100)
      ],
      "PulmonaryBestAUC": [
        Math.round(this.performanceData.PulmonaryBestAUC[6]*100),
        Math.round(this.performanceData.PulmonaryBestAUC[5]*100),
        Math.round(this.performanceData.PulmonaryBestAUC[4]*100),
        Math.round(this.performanceData.PulmonaryBestAUC[3]*100),
        Math.round(this.performanceData.PulmonaryBestAUC[2]*100),
        Math.round(this.performanceData.PulmonaryBestAUC[1]*100),
        Math.round(this.performanceData.PulmonaryBestAUC[0]*100)
      ],
      "OtherBestAUC": [
        Math.round(this.performanceData.BestAUC[6]*100),
        Math.round(this.performanceData.BestAUC[5]*100),
        Math.round(this.performanceData.BestAUC[4]*100),
        Math.round(this.performanceData.BestAUC[3]*100),
        Math.round(this.performanceData.BestAUC[2]*100),
        Math.round(this.performanceData.BestAUC[1]*100),
        Math.round(this.performanceData.BestAUC[0]*100)
      ]
    }
  }

  getAllSessions():any{
    return this.products.SessionId;
  }

  getSessionRaw(): Promise<SessionRaw[]> {
    return new Promise<SessionRaw[]>((resolve, reject) => {
      this.httpClient.get("assets/data/data_dynamic.json")
        .subscribe((resp: any) => {
          resolve(resp);

        }, error => {
          let respError = error;
          if (error.status === 500) {
            respError = ["Error"];
          }
          reject(respError);
        }
        );
    })
  }

  getSessionScoresById(session: string): Promise<[number, number, number]> {
    return new Promise<[number, number, number]>((resolve, reject) => {
      this.httpClient.get("assets/data/data_dynamic.json")
        .subscribe((resp: any) => {
          if (session == '')
            resolve([0, 0, 0]);
          this.sessionNumber = parseInt(session);
          resolve([
            Math.round(resp.CardiacLimProba100[this.sessionNumber] * 100),
            Math.round(resp.PulmonaryLimProba100[this.sessionNumber] * 100),
            Math.round(resp.OtherLimProba100[this.sessionNumber] * 100)
          ]);
          resolve(resp);
        }, error => {
          let respError = error;
          if (error.status === 500) {
            respError = ["Error"];
          }
          reject(respError);
        }
        );
    })
  }

  getSessionScores(session:string):[number,number,number]{
    if (session == '')
      return [0,0,0]
    let resultTest=this.getSessionScoresById(session);
    let result=this.getSessionRaw();
    result.then(function(result){
    });
    this.sessionNumber = parseInt(session);
    return [this.products.CardiacProba[this.sessionNumber],
            this.products.PulmonaryProba[this.sessionNumber],
            this.products.OtherProba[this.sessionNumber]];
  }

  getAllTimesSessionScoresById(session:string):Promise<Session | null>{
    return new Promise<Session| null>((resolve, reject) => {
      this.httpClient.get("assets/data/data_dynamic.json")
        .subscribe((resp: any) => {
          if (session == '')
            resolve(null);
          this.sessionNumber = parseInt(session);
          let objectResult: Session={
            PatientId:resp.PatientId[this.sessionNumber],
            SessionId:resp.SessionId[this.sessionNumber],
            RealCardiacLim:resp.CardiacLim[this.sessionNumber],
            RealPulmonaryLim:resp.PulmonaryLim[this.sessionNumber],
            RealOtherLim:resp.OtherLim[this.sessionNumber],
            Time:[40, 50, 60, 70, 80, 90, 100],
            CardiacScores:[
              Math.round(resp.CardiacLimProba40[this.sessionNumber]),
              Math.round(resp.CardiacLimProba50[this.sessionNumber]),
              Math.round(resp.CardiacLimProba60[this.sessionNumber]),
              Math.round(resp.CardiacLimProba70[this.sessionNumber]),
              Math.round(resp.CardiacLimProba80[this.sessionNumber]),
              Math.round(resp.CardiacLimProba90[this.sessionNumber]),
              Math.round(resp.CardiacLimProba100[this.sessionNumber])
            ],
            PulmonaryScores:[
              Math.round(resp.PulmonaryLimProba40[this.sessionNumber]),
              Math.round(resp.PulmonaryLimProba50[this.sessionNumber]),
              Math.round(resp.PulmonaryLimProba60[this.sessionNumber]),
              Math.round(resp.PulmonaryLimProba70[this.sessionNumber]),
              Math.round(resp.PulmonaryLimProba80[this.sessionNumber]),
              Math.round(resp.PulmonaryLimProba90[this.sessionNumber]),
              Math.round(resp.PulmonaryLimProba100[this.sessionNumber])
            ],
            OtherScores:[
              Math.round(resp.OtherLimProba40[this.sessionNumber]),
              Math.round(resp.OtherLimProba50[this.sessionNumber]),
              Math.round(resp.OtherLimProba60[this.sessionNumber]),
              Math.round(resp.OtherLimProba70[this.sessionNumber]),
              Math.round(resp.OtherLimProba80[this.sessionNumber]),
              Math.round(resp.OtherLimProba90[this.sessionNumber]),
              Math.round(resp.OtherLimProba100[this.sessionNumber])
            ],
          };
          resolve(objectResult);
        }, error => {
          let respError = error;
          if (error.status === 500) {
            respError = ["Error"];
          }
          reject(null);
        }
        );
    });

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
      "Time": [40, 50, 60, 70, 80, 90, 100],
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
    };
  }
}
