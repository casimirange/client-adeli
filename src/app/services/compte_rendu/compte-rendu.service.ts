import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CompteRendu} from "../../Models/cr";
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class CompteRenduService {

  constructor(private http: HttpClient) { }

  addCR(cr: CompteRendu): Observable<any>{
    return this.http.post(environment.COMPTE_RENDU_URL, cr );
  }

  putCompteRendu(id: number, info: CompteRendu): Observable<any>{
    return this.http.put(environment.COMPTE_RENDU_URL + `?id=${id}`, info, httpOptions );
  }

  deleteCompteRendu(id: number): Observable<any>{
    return this.http.delete(environment.COMPTE_RENDU_URL + `?id=${id}`);
  }

  getCR(): Observable<any>{
    return this.http.get(environment.COMPTE_RENDU_URL);
  }
}
