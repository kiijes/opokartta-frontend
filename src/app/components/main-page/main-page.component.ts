import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {

  pages;
  subscription: Subscription;
  constructor(private bs: BackendService) { }

  ngOnInit(): void {
    this.subscription = this.bs.getAllPages().subscribe(res => {
      this.pages = res;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
