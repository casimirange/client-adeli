import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Communique} from "../../Models/communique";
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class CommuniqueService {

  constructor(private http: HttpClient) { }

  addCommunique(communique: Communique): Observable<any>{
    return this.http.post(environment.COMMUNIQUE_URL, communique );
  }

  putCommunique(id: number, info: Communique): Observable<any>{
    return this.http.put(environment.COMMUNIQUE_URL + `?id=${id}`, info, httpOptions );
  }

  deleteCommunique(id: number): Observable<any>{
    return this.http.delete(environment.COMMUNIQUE_URL + `?id=${id}`);
  }

  getCommunique(): Observable<any>{
    return this.http.get(environment.COMMUNIQUE_URL);
  }
}
