import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = 'http://localhost:3000/api/v1';
  private pageSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private pageContentSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private supportSourceSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }

  getPages(): BehaviorSubject<any> {
    return this.pageSubject;
  }

  updatePages() {
    this.http.get(this.baseUrl + '/pages-nosub')
      .subscribe((res) => {
        this.pageSubject.next(res);
      });
  }

  getPageContent(): BehaviorSubject<any> {
    return this.pageContentSubject;
  }

  updatePageContent(id: string) {
    this.http.get(this.baseUrl + '/pages/' + id)
      .subscribe((res) => {
        this.pageContentSubject.next(res[0]);
      });
  }

  getSupportSources(): BehaviorSubject<any> {
    return this.supportSourceSubject;
  }

  updateSupportSources(id: string, pid: string) {
    this.http.get(this.baseUrl + '/pages/' + id + '/page-contents/' + pid)
      .subscribe((res) => {
        this.supportSourceSubject.next(res);
      });
  }

  editPage(id: string, body: object) {
    return this.http.put(this.baseUrl + '/pages/' + id, body);
  }
}
