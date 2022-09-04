import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getMessages(type: string, page: number) {
    return this.http.get(`${this.apiUrl}/${type}?_page=${page}&_limit=5`, {
      observe: 'response'
    })
  }

}
