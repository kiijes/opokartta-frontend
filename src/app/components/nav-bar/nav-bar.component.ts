import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  showLogout: boolean;
  subscription: Subscription;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.auth.authenticatedSubject().subscribe(res => {
      this.showLogout = res;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.auth.logout();
  }

}
