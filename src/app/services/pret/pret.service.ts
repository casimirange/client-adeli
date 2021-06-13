import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Prêts} from "../../Models/prets";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class PretService {

  constructor(private http: HttpClient) { }

  getPrets(): Observable<any> {
    return this.http.get(environment.PRET_URL);
  }

  newPret(id: any, info: Prêts): Observable<any> {
    return this.http.post<any>(environment.PRET_URL + `?user=${id}`, info, httpOptions);
  }
}
