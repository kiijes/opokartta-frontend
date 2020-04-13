import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent implements OnInit, OnDestroy {

  page;
  subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private bs: BackendService
    ) { }

  ngOnInit(): void {
    this.subscription = this.bs.getPageContent().subscribe(res => {
      this.page = res;
    });

    this.bs.updatePageContent(this.route.snapshot.params.id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
