import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'opokartta-frontend';

  constructor(
    private authServ: AuthService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('jwt-token')) {
      this.authServ.authenticate();
    }
  }
}
