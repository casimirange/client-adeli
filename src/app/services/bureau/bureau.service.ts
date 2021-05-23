import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Bureau} from "../../Models/bureau";

@Injectable({
  providedIn: 'root'
})
export class BureauService {

  constructor(private http: HttpClient) { }

  addBureau(b: Bureau): Observable<any>{
    return this.http.post(environment.ELECTION_URL, b );
  }

  getBureau(): Observable<any>{
    return this.http.get(environment.ELECTION_URL);
  }

  getEvolution(): Observable<any>{
    return this.http.get(environment.ELECTION_URL + '/evolution');
  }
}
