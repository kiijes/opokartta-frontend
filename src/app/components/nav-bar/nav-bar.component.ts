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
  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authServ.authenticatedSubject().subscribe(res => {
      this.showLogout = res;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.authServ.logout();
  }

}
