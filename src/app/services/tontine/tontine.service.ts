import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})


export class TontineService {

  constructor(private http: HttpClient) { }

  getSolde(): Observable<any>{
    return this.http.get(environment.TONTINE_URL + `/solde`);
  }

  getHistoriqueBySession(id_session: number): Observable<any>{
    return this.http.get(environment.TONTINE_URL + `/session/${id_session}`);
  }

  getHistoriqueActiveSession(): Observable<any>{
    return this.http.get(environment.TONTINE_URL + `/session`);
  }

  newCotisation(id: any): Observable<any> {
    return this.http.post<any>(environment.TONTINE_URL + `?user=${id}`, httpOptions);
  }
}
