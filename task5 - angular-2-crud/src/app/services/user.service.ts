import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(this.apiUrl, {
      params: {
        _page: `${page}`,
        _limit: '10'
      },
      observe: 'response'
    });
  }

  getOneUser(id: number): Observable<User> {
    return this.http.get(this.apiUrl + '/' + id);
  }

  addUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  editUser(user: User, id: number): Observable<any> {
    return this.http.put(this.apiUrl + '/' + id, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }

}
