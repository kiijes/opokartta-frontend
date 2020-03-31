import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/v1';
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
        this.router.navigate(['']);
      }
    });
  }

  /**
   * Removes the JWT token from local storage
   * to log out the session.
   */
  logout() {
    localStorage.removeItem('jwt-token');
    this.router.navigate(['login']);
  }

  /**
   * Returns whether the user is authenticated or not
   * by checking if the JWT token exists in local storage.
   */
  get isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt-token');
    return (token !== null) ? true : false;
  }
}
