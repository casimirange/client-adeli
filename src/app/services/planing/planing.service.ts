import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlaningService {

  constructor(private http: HttpClient) { }

  getPlaning(): Observable<any>{
    return this.http.get(environment.PLANING_URL);
  }
}
