import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  hide = true;
  error: string;
  isHandsetOrTablet = false;
  private subscription: Subscription;
  constructor(
    public router: Router,
    public auth: AuthService,
    public breakpointObserver: BreakpointObserver
    ) { }

  ngOnInit(): void {
    // If a token exists in local storage, authenticate it
    if (this.auth.token) {
      // If a redirect URL exists, send it, otherwise redirect to main page
      this.auth.authenticate(this.auth.redirectUrl ? this.auth.redirectUrl : '');
    }

    // Subscribe to a breakpoint observer to set whether
    // the user device is a handset/tablet or not
    this.subscription = this.breakpointObserver
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
