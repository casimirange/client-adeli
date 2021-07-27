import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Bureau} from "../../Models/bureau";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class BureauService {

  constructor(private http: HttpClient) { }

  addBureau(b: Bureau): Observable<any>{
    return this.http.post(environment.ELECTION_URL, b );
  }

  updateBureau(user: any, id: number, info: Bureau): Observable<any>{
    return this.http.put(environment.ELECTION_URL + `/?user=${user}&id=${id}`, info, httpOptions );
  }

  getBureau(): Observable<any>{
    return this.http.get(environment.ELECTION_URL);
  }

  getEvolution(): Observable<any>{
    return this.http.get(environment.ELECTION_URL + '/evolution');
  }

  deletePannes(id: number): Observable<any>{
    return this.http.delete(environment.ELECTION_URL + `/${id}`);
  }
}
