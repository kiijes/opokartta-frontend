import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  /**
   * Implements the CanActivate guard by
   * calling AuthService's isAuthenticated
   * getter. Navigates back to the login screen
   * if authentication fails.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Save calling url for redirection
    const url: string = state.url;
    return this.checkLogin(url);
  }

  /**
   * Checks if user is logged in and if not,
   * sets the redirect url and navigates to
   * login page.
   * @param url URL the user called
   */
  checkLogin(url: string): boolean {
    if (this.auth.isAuthenticated) {
      return true;
    }

    // If user is not authenticated, set redirect url
    this.auth.redirectUrl = url;
    // Navigate back to login page
    this.router.navigate(['/login']);
    return false;
  }
}
