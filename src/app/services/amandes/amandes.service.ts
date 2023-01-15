import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Amandes} from "../../Models/amandes";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AmandesService {

  constructor(private http: HttpClient) { }

  getSolde(): Observable<any>{
    return this.http.get(environment.AMANDE_URL + `/solde`);
  }

  getAmandes(): Observable<any>{
    return this.http.get(environment.AMANDE_URL);
  }

  newAmande(id: any, info: Amandes): Observable<any> {
    return this.http.post<any>(environment.AMANDE_URL + `?user=${id}`, info, httpOptions);
  }
}
