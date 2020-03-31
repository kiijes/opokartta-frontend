import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  error: string;
  constructor(public router: Router, public auth: AuthService) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated) {
      this.router.navigate(['']);
    }
  }

  /**
   * Submits the login form to auth service.
   * @param formData Object with the form fields as properties
   */
  onSubmit(formData: any): void {
    if (!formData.username || !formData.password) {
      this.error = 'No username or password';
      return;
    }
    console.log(formData);
    this.auth.login(formData.username, formData.password);
  }

}
