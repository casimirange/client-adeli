import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

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
}
