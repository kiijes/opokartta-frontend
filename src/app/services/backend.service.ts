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

  /**
   * Return a BehaviorSubject that sends info
   * about pages when they are updated.
   */
  getPages(): BehaviorSubject<any> {
    return this.pageSubject;
  }

  /**
   * Get pages and send them via the
   * BehaviorSubject returned by getPages().
   */
  updatePages() {
    this.http.get(this.baseUrl + '/pages-nosub')
      .subscribe((res) => {
        this.pageSubject.next(res);
      });
  }

  /**
   * Return a BehaviorSubject that sends info
   * about page contents when they are updated.
   */
  getPageContent(): BehaviorSubject<any> {
    return this.pageContentSubject;
  }

  /**
   * Get page contents and send them via
   * the BehaviorSubject returned by getPageContent().
   * @param id ID of Page document
   */
  updatePageContent(id: string) {
    this.http.get(this.baseUrl + '/pages/' + id)
      .subscribe((res) => {
        this.pageContentSubject.next(res[0]);
      });
  }

  /**
   * Return a BehaviorSubject that sends info
   * about support sources when they are updated.
   */
  getSupportSources(): BehaviorSubject<any> {
    return this.supportSourceSubject;
  }

  /**
   * Get support sources and send them via
   * the BehaviorSubject returned by getSupportSources().
   * @param id ID of Page document
   * @param pid ID of PageContent document
   */
  updateSupportSources(id: string, pid: string) {
    this.http.get(this.baseUrl + '/pages/' + id + '/page-contents/' + pid)
      .subscribe((res) => {
        this.supportSourceSubject.next(res);
      });
  }

  /**
   * Send the data from edit page form
   * to the backend.
   * @param id ID of Page document
   * @param body Body containing updated info
   */
  editPage(id: string, body: object) {
    return this.http.put(this.baseUrl + '/pages/' + id, body);
  }

  /**
   * Create a new Page document.
   * @param body New page object
   */
  addPage(body: object): void {
    this.http.post(this.baseUrl + '/pages', body)
      .subscribe(() => {
        this.updatePages();
      });
  }

  /**
   * Delete a Page document.
   * @param id ID of Page document
   */
  deletePage(id: string): void {
    this.http.delete(this.baseUrl + '/pages/' + id)
      .subscribe(() => {
        this.updatePages();
      });
  }
}
