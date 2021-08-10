import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CpetService implements OnInit {
  products:any;
  sessionNumber:number;
  // constructor(private http: HttpClient) { 
  //   this.data = this.http.get("./assets/data.json");
  // }
  constructor(private httpClient: HttpClient){
    this.httpClient.get("assets/data.json").subscribe(data =>{
      console.log('**********************');
      console.log(data);
      this.products = data;
    })
  }

  ngOnInit(){
    this.httpClient.get("assets/data.json").subscribe(data =>{
      console.log('**********************');
      console.log(data);
      this.products = data;
    })
  }

  getAllSessions():any{
    return this.products.SessionId;
  }

  getSessionScores(session:string):[number,number,number]{
    if (session == '')
      return [0,0,0]
    this.sessionNumber = parseInt(session);
    console.log('-----------');
    console.log(this.products.CardiacProba[this.sessionNumber])
    console.log(this.products.PulmonaryProba[this.sessionNumber])
    console.log(this.products.OtherProba[this.sessionNumber])
    return [this.products.CardiacProba[this.sessionNumber],
            this.products.PulmonaryProba[this.sessionNumber],
            this.products.OtherProba[this.sessionNumber]]
  }
}
