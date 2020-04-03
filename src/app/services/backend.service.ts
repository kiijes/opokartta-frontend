import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = 'http://localhost:3000/api/v1';
  constructor(private http: HttpClient) { }

  getAllPages() {
    return this.http.get(this.baseUrl + '/pages-nosub');
  }

  getPageWithId(id: string) {
    return this.http.get(this.baseUrl + '/pages/' + id);
  }

  getPageContentWithId(id: string, pid: string) {
    return this.http.get(this.baseUrl + '/pages/' + id + '/page-contents/' + pid);
  }
}
