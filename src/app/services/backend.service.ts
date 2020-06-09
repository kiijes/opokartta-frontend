import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = 'https://tiko.jamk.fi/api/v1';
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
   * Edit a Page document.
   * @param id ID of Page document
   * @param body Edited Page document
   */
  editPage(id: string, body: object): void {
    this.http.put(this.baseUrl + '/pages/' + id, body)
      .subscribe(() => {
        this.updatePages();
      });
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

  /**
   * Edit a PageContent document.
   * @param id ID of Page document
   * @param pid ID of PageContent document
   * @param body Edited PageContent document
   */
  editPageContent(id: string, pid: string, body: object): void {
    this.http.put(this.baseUrl + '/pages/' + id + '/page-contents/' + pid, body)
      .subscribe(() => {
        this.updatePageContent(id);
      });
  }

  /**
   * Create a new PageContent document.
   * @param id ID of Page document
   * @param body New PageContent document
   */
  addPageContent(id: string, body: object): void {
    this.http.post(this.baseUrl + '/pages/' + id + '/page-contents', body)
      .subscribe(() => {
        this.updatePageContent(id);
      });
  }

  /**
   * Delete a PageContent document.
   * @param id ID of Page document
   * @param pid ID of PageContent document
   */
  deletePageContent(id: string, pid: string): void {
    this.http.delete(this.baseUrl + '/pages/' + id + '/page-contents/' + pid)
      .subscribe(() => {
        this.updatePageContent(id);
      });
  }

  /**
   * Move an element in the PageContent array.
   * @param id ID of Page document
   * @param pid ID of PageContent document
   * @param direction Direction to which element is moved; either up or down
   */
  movePageContent(id: string, pid: string, direction: string): void {
    this.http.put(this.baseUrl + '/pages/' + id + '/page-contents/' + pid + '/move', { move: direction })
      .subscribe(() => {
        this.updatePageContent(id);
      });
  }

  /**
   * Update a SupportSource document.
   * @param id ID of Page document
   * @param pid ID of PageContent document
   * @param sid ID of SupportSource document
   * @param body Edited SupportSource document
   */
  editSupportSource(id: string, pid: string, sid: string, body: object): void {
    this.http.put(
      this.baseUrl + '/pages/'
      + id + '/page-contents/'
      + pid + '/support-sources/'
      + sid, body).subscribe(() => {
        this.updateSupportSources(id, pid);
      });
  }

  /**
   * Create a new SupportSource document.
   * @param id ID of Page document
   * @param pid ID of PageContent document
   * @param body New SupportSource document
   */
  addSupportSource(id: string, pid: string, body: object): void {
    this.http.post(this.baseUrl + '/pages/' + id + '/page-contents/' + pid, body)
      .subscribe(() => {
        this.updateSupportSources(id, pid);
      });
  }

  /**
   * Delete a SupportSource document.
   * @param id ID of Page document
   * @param pid ID of PageContent document
   * @param sid ID of SupportSource document
   */
  deleteSupportSource(id: string, pid: string, sid: string): void {
    this.http.delete(this.baseUrl + '/pages/' + id
    + '/page-contents/' + pid + '/support-sources/' + sid)
      .subscribe(() => {
        this.updateSupportSources(id, pid);
      });
  }

  /**
   * Move an element in the SupportSource array.
   * @param id ID of Page document
   * @param pid ID of PageContent document
   * @param sid ID of SupportSources document
   * @param direction Direction to which element is moved; either up or down
   */
  moveSupportSource(id: string, pid: string, sid: string, direction: string): void {
    this.http.put(this.baseUrl + '/pages/' + id
    + '/page-contents/' + pid + '/support-sources/' + sid
    + '/move', { move: direction }).subscribe(() => {
      this.updateSupportSources(id, pid);
    });
  }
}
