import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/v1';
  constructor(private http: HttpClient, private router: Router) { }

  login(user: string, pass: string) {
    this.http.post<any>(this.baseUrl + '/user/signin', { username: user, password: pass })
    .subscribe((data: any) => {
      if (data.success) {
        localStorage.setItem('jwt-token', data.token);
        this.router.navigate(['']);
      }
    });
  }

  get isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt-token');
    return (token !== null) ? true : false;
  }
}
