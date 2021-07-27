import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Planing} from "../../Models/Planing";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PlaningService {

  constructor(private http: HttpClient) { }

  getPlaning(): Observable<any> {
    return this.http.get(environment.PLANING_URL);
  }

  newPlanning(info: Planing, id: any): Observable<any> {
    return this.http.post<any>(environment.PLANING_URL + `/new?user=${id}`, info, httpOptions);
  }

  updatePlanning(info: Planing, user: any, id: number ): Observable<any> {
    return this.http.put<any>(environment.PLANING_URL + `?user=${user}&id=${id}`, info, httpOptions);
  }

  deletePlaning(id: number): Observable<any>{
    return this.http.delete(environment.PLANING_URL + `?id=${id}`);
  }
}
