import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Discipline} from "../../Models/discipline";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  constructor(private http: HttpClient) { }

  addDiscipline(discipline: Discipline): Observable<any>{
    return this.http.post(environment.DISCIPLINE_URL, discipline );
  }

  getDiscipline(session?: string): Observable<any>{
    return this.http.get(environment.DISCIPLINE_URL+`?sessionId=${session}`);
  }

  newDiscipline(id: any, info: Discipline): Observable<any> {
    return this.http.post<any>(environment.DISCIPLINE_URL + `?user=${id}`, info, httpOptions);
  }

  putDiscipline(user: any, id: any,  info: Discipline): Observable<any> {
    return this.http.put<any>(environment.DISCIPLINE_URL + `?user=${user}&id=${id}`, info, httpOptions);
  }

  deleteDiscipline(id: any): Observable<any> {
    return this.http.delete<any>(environment.DISCIPLINE_URL + `?id=${id}`, httpOptions);
  }
}
