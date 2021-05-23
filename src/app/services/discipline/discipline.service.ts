import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Discipline} from "../../Models/discipline";

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  constructor(private http: HttpClient) { }

  addDiscipline(discipline: Discipline): Observable<any>{
    return this.http.post(environment.DISCIPLINE_URL, discipline );
  }

  getDiscipline(): Observable<any>{
    return this.http.get(environment.DISCIPLINE_URL);
  }
}
