import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CpetService {
  constructor() { }

  getSessionScores(session:string):[number,number,number]{
    if (session == '')
      return [0,0,0]
    return [15,10,90]
  }
}
