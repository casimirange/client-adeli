import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Beneficiaires} from "../../Models/beneficiaires";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class BeneficiaireService {

  constructor(private http: HttpClient) { }

  getBeneficiaireSession(session: string): Observable<any>{
    return this.http.get(environment.BENEFICIAIRE_URL+`?sessionId=${session}`);
  }

  newBenef(id: any, info: Beneficiaires, date: any): Observable<any> {
    return this.http.post<any>(environment.BENEFICIAIRE_URL + `/news/?id=${id}&date=${date}`, info, httpOptions);
  }

}
