import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Communique} from "../../Models/communique";

@Injectable({
  providedIn: 'root'
})
export class CommuniqueService {

  constructor(private http: HttpClient) { }

  addCommunique(communique: Communique): Observable<any>{
    return this.http.post(environment.COMMUNIQUE_URL, communique );
  }

  getCommunique(): Observable<any>{
    return this.http.get(environment.COMMUNIQUE_URL);
  }
}
