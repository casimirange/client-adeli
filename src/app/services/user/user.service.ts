import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
// import {API_URLS} from "../../configs/api.url.configs";
import {environment} from "../../../environments/environment";
// import {User} from "../../Models/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/api/test/user';
  // private userUrl = 'http://localhost:8080/api/test/user';
  private pmUrl = 'http://localhost:8080/api/test/pm';
  // private pmUrl = 'http://localhost:8080/api/test/pm';
  private adminUrl = 'http://localhost:8080/api/test/admin';
  // private adminUrl = 'http://localhost:8080/api/test/admin';
  private users = 'http://localhost:8080/api/auth';
  // private users = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  countUsers() {
    return this.http.get(environment.URERS +`/count` );
  }

  getPMBoard() {
    // return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard() {
    // return this.http.get(this.adminUrl, { responseType: 'text' });
  }

  getUsers(): Observable<any> {
    return this.http.get(environment.URERS);
  }

  getActiveUsers(): Observable<any> {
    return this.http.get(environment.URERS +'/active');
  }

  getUser(id: number): Observable <any> {
    return this.http.get(environment.URERS + `/id/${id}`);
  }

  getPret(id: number, sessionId?: string): Observable <any> {
    return this.http.get(environment.PRET_URL + `/id/${id}/?sessionId=${sessionId}`);
  }

  getTontine(id: number, sessionId?: string): Observable <any> {
    return this.http.get(environment.TONTINE_URL + `/id/${id}/?sessionId=${sessionId}`);
  }

  getAmande(id: number, sessionId?: string): Observable <any> {
    return this.http.get(environment.AMANDE_URL + `/id/${id}/?sessionId=${sessionId}`);
  }

  getDiscipline(id: number, sessionId?: string): Observable <any> {
    return this.http.get(environment.DISCIPLINE_URL + `/id/${id}/?sessionId=${sessionId}`);
  }
  //
  // addUser(users: User ): Observable<any>{
  //   return this.http.post(API_URLS.USERS_URL + `/users`, users);
  // }
  //
  // addAdmin(users: User ): Observable<any>{
  //   return this.http.post(API_URLS.USERS_URL + `/admin`, users);
  // }
  //
  // addSuperAdmin(users: User ): Observable<any>{
  //   return this.http.post(API_URLS.USERS_URL + `/super_admin`, users);
  // }
  //
  // updateUsers(users: User): Observable<any>{
  //   return this.http.put(API_URLS.USERS_URL, users);
  // }
  //
  // deleteUsers(matricule: number): Observable<any>{
  //   return this.http.delete(API_URLS.USERS_URL + `/${matricule}`);
  // }
  //
  // showUser(matricule: number): Observable<any>{
  //   return this.http.get(API_URLS.USERS_URL + `/${matricule}`);
  // }
  //
  // findUser(username: string): Observable<any>{
  //   return this.http.get(API_URLS.USERS_URL + `/s/${username}`);
  // }


}
