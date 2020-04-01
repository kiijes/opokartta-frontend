import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/v1';
  private authenticated: boolean;
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Sends the username and password to the server for authentication
   * and receives an object containing a JWT token if successful.
   * @param user Username
   * @param pass Password
   */
  login(user: string, pass: string) {
    this.http.post<any>(this.baseUrl + '/user/signin', { username: user, password: pass })
    .subscribe((data: any) => {
      if (data.success) {
        localStorage.setItem('jwt-token', data.token);
        this.authenticate();
      }
    });
  }

  /**
   * Removes the JWT token from local storage
   * to log out the session.
   */
  logout() {
    localStorage.removeItem('jwt-token');
    this.authenticated = false;
    this.router.navigate(['login']);
  }

  /**
   * Returns whether the user is authenticated or not.
   */
  get isAuthenticated(): boolean {
    return this.authenticated;
  }

  /**
   * Validate the client's JWT token in the backend
   * to grant access.
   */
  authenticate(): void {
    const token = localStorage.getItem('jwt-token');
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token
      })
    };
    this.http.get(this.baseUrl + '/user/auth', httpOptions).subscribe((res: boolean) => {
      this.authenticated = res;
      this.router.navigate(['']);
    });
  }

  get token(): string {
    const token = localStorage.getItem('jwt-token');
    return token;
  }
}
