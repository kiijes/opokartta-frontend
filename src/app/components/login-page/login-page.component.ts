import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(public router: Router, public auth: AuthService) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated) {
      this.router.navigate(['']);
    }
  }

  onSubmit(formData: any): void {
    this.auth.login(formData.username, formData.password);
  }

}
