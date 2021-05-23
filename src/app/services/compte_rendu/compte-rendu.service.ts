import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CompteRendu} from "../../Models/cr";

@Injectable({
  providedIn: 'root'
})
export class CompteRenduService {

  constructor(private http: HttpClient) { }

  addCR(cr: CompteRendu): Observable<any>{
    return this.http.post(environment.COMPTE_RENDU_URL, cr );
  }

  getCR(): Observable<any>{
    return this.http.get(environment.COMPTE_RENDU_URL);
  }
}
