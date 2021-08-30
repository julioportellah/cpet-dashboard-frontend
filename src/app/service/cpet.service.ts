import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Session } from '../models/session.model';
import { SessionRaw } from '../models/session-raw.model';
import { PatientFullPrediction } from '../models/patient-full-prediction.model';
import { PatientForm } from '../models/patient-form.model';

@Injectable({
  providedIn: 'root'
})
export class CpetService implements OnInit {
  products:any;
  dynamicData: any;
  performanceData: any;
  sessionNumber:number;
  //baseUrl:string=`https://cpet-backend.azurewebsites.net`;
  baseUrl:string=`http://127.0.0.1:5000`;
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

  getCardiacSummaryPlotAsync(session:string): Promise<[string, string, string, string, string, string]>{
    return new Promise<[string, string, string, string, string, string]>((resolve,reject)=>{
      this.httpClient.get(this.baseUrl+`/api/get_shap_interpretation_by_session_id/`+session)
      .subscribe((resp: any)=>{
        if (session == '')
          resolve(["","","","","",""]);
        resolve([resp.cardiac_summary, resp.cardiac_force, 
                resp.pulmonary_summary, resp.pulmonary_force,
                resp.other_summary, resp.other_force ]);
      }, error => {
        let respError = error;
        if (error.status === 500) {
          respError = ["Error"];
        }
        reject(respError);

      })
    });
  }

  getSessionScoresByIdAsync(session: string): Promise<[number, number, number]>{
    return new Promise<[number, number, number]>((resolve, reject) => {
      this.httpClient.get(this.baseUrl+`/api/get_record_by_patient_id/`+session)
      .subscribe((resp: any) => {
        if (session == '')
          resolve([0, 0, 0]);
        resolve([
          resp.cardiac_proba,
          resp.pulmonary_proba,
          resp.other_proba
        ]);
      }, error => {
        let respError = error;
        if (error.status === 500) {
          respError = ["Error"];
        }
        reject(respError);

      })
    });
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

  getAllTimesSessionScoresByIdAsync(session: string):Promise<Session |null>{
    return new Promise<Session| null>((resolve, reject) =>{
      this.httpClient.get(this.baseUrl+`/api/get_dynamic_record_by_session_id/`+session)
      .subscribe((resp:any)=> {
        if (session == '')
          resolve(null);
        let objectResult: Session = {
          PatientId: resp.patient_id,
          SessionId: resp.session_id,
          RealCardiacLim: resp.cardiac_lim,
          RealPulmonaryLim: resp.pulmonary_lim,
          RealOtherLim: resp.other_lim,
          Time: resp.time_list,
          CardiacScores: resp.cardiac_proba,
          PulmonaryScores: resp.pulmonary_proba,
          OtherScores: resp.other_proba
        };
        resolve(objectResult);
      }, error => {
        let respError = error;
        if (error.status === 500) {
          respError = ["Error"];
        }
        reject(null);
      })
    });
  }

  analyzePatientData(patientForm: PatientForm): Promise<Session | null> {
    return new Promise<Session | null>((resolve, reject) => {
      this.httpClient.post<PatientForm>(this.baseUrl + `/api/analyze_patient_data/`, patientForm)
        .subscribe((resp: any) => {
          
        }, error => {
          let respError = error;
          if (error.status === 500) {
            respError = ["Error"];
          }
          reject(null);
        });
    })
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
            RealCardiacLim:resp.CardiacLim[this.sessionNumber]*100,
            RealPulmonaryLim:resp.PulmonaryLim[this.sessionNumber]*100,
            RealOtherLim:resp.OtherLim[this.sessionNumber]*100,
            Time:[40, 50, 60, 70, 80, 90, 100],
            CardiacScores:[
              Math.round(resp.CardiacLimProba40[this.sessionNumber]*100),
              Math.round(resp.CardiacLimProba50[this.sessionNumber]*100),
              Math.round(resp.CardiacLimProba60[this.sessionNumber]*100),
              Math.round(resp.CardiacLimProba70[this.sessionNumber]*100),
              Math.round(resp.CardiacLimProba80[this.sessionNumber]*100),
              Math.round(resp.CardiacLimProba90[this.sessionNumber]*100),
              Math.round(resp.CardiacLimProba100[this.sessionNumber]*100)
            ],
            PulmonaryScores:[
              Math.round(resp.PulmonaryLimProba40[this.sessionNumber]*100),
              Math.round(resp.PulmonaryLimProba50[this.sessionNumber]*100),
              Math.round(resp.PulmonaryLimProba60[this.sessionNumber]*100),
              Math.round(resp.PulmonaryLimProba70[this.sessionNumber]*100),
              Math.round(resp.PulmonaryLimProba80[this.sessionNumber]*100),
              Math.round(resp.PulmonaryLimProba90[this.sessionNumber]*100),
              Math.round(resp.PulmonaryLimProba100[this.sessionNumber]*100)
            ],
            OtherScores:[
              Math.round(resp.OtherLimProba40[this.sessionNumber]*100),
              Math.round(resp.OtherLimProba50[this.sessionNumber]*100),
              Math.round(resp.OtherLimProba60[this.sessionNumber]*100),
              Math.round(resp.OtherLimProba70[this.sessionNumber]*100),
              Math.round(resp.OtherLimProba80[this.sessionNumber]*100),
              Math.round(resp.OtherLimProba90[this.sessionNumber]*100),
              Math.round(resp.OtherLimProba100[this.sessionNumber]*100)
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
