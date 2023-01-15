import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Sessions} from "../../Models/Sessions";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  getActiveSession(): Observable<any>{
    return this.http.get(environment.SESSION_URL + `/active`);
  }

  getAllSession(): Observable<any>{
    return this.http.get(environment.SESSION_URL + `/all`);
  }

  newSession(info: Sessions): Observable<string>{
    return this.http.post<string>(environment.SESSION_URL + '/new', info, httpOptions);
  }

  desableSession(id: number): Observable<string>{
    return this.http.put<string>(environment.SESSION_URL + `/disable/${id}`, httpOptions);
  }
}
