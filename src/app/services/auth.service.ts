import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Base url for the backend API
  private baseUrl = 'https://tiko.jamk.fi/api/v1';

  // BehaviorSubject that informs subscribers
  // whether the user is authenticated or not.
  private authenticated = new BehaviorSubject<boolean>(false);

  // URL used for redirection after authentication
  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Sends the username and password to the server for authentication
   * and receives an object containing a JWT token if successful.
   * @param user Username
   * @param pass Password
   */
  login(user: string, pass: string) {
    this.http.post<any>(this.baseUrl + '/user/signin', { username: user, password: pass }, { headers: { skip: 'true' } })
    .subscribe((data: any) => {
      if (data.success) {
        localStorage.setItem('jwt-token', data.token);
        this.authenticated.next(true);
        this.router.navigate(['/pages']);
      }
    });
  }

  /**
   * Removes the JWT token from local storage
   * to log out the session.
   */
  logout() {
    localStorage.removeItem('jwt-token');
    this.authenticated.next(false);
    this.router.navigate(['login']);
  }

  /**
   * Returns whether the user is authenticated or not.
   */
  get isAuthenticated(): boolean {
    return this.authenticated.value;
  }

  /**
   * Return the authenticated BehaviorSubject
   * as an observable.
   */
  authenticatedSubject(): Observable<boolean> {
    return this.authenticated.asObservable();
  }

  /**
   * Validate the client's JWT token in the backend
   * to grant access.
   */
  authenticate(url: string): void {
    const token = localStorage.getItem('jwt-token');
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token
      })
    };
    this.http.get(this.baseUrl + '/user/auth', httpOptions).subscribe((res: boolean) => {
      this.authenticated.next(res);
      this.router.navigate([url]);
    }, () => false);
  }

  /**
   * Get the token from local storage.
   */
  get token(): string {
    const token = localStorage.getItem('jwt-token');
    return token;
  }
}
