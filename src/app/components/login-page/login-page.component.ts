import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  hide = true;
  error: string;
  isHandsetOrTablet = false;
  constructor(
    public router: Router,
    public auth: AuthService,
    public breakpointObserver: BreakpointObserver
    ) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated) {
      this.router.navigate(['']);
    }

    this.breakpointObserver
    .observe([
      Breakpoints.Handset,
      Breakpoints.Tablet
    ]).subscribe((result) => {
      if (result.matches) {
        this.isHandsetOrTablet = true;
      } else {
        this.isHandsetOrTablet = false;
      }
    });
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
    this.auth.login(formData.username, formData.password);
  }

}
