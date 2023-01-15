import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Mangwas} from "../../Models/mangwa";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RetenueService {

  constructor(private http: HttpClient) { }

  getSolde(): Observable<any>{
    return this.http.get(environment.RETENUE_URL + `/solde`);
  }

  getMangwa(): Observable<any>{
    return this.http.get(environment.RETENUE_URL);
  }

  newMangwa(id: any, info: Mangwas): Observable<any> {
    return this.http.post<any>(environment.RETENUE_URL + `?user=${id}`, info, httpOptions);
  }
}
