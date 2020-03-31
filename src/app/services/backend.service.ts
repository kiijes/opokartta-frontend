import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = 'http://localhost:3000/api/v1';
  constructor(private http: HttpClient) { }

  getAllPages() {
    return this.http.get(this.baseUrl + '/pages');
  }

  getPageWithId(id: string) {
    return this.http.get(this.baseUrl + '/pages/' + id);
  }
}
