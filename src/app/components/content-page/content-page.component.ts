import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent implements OnInit, OnDestroy {

  page;
  subscription: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bs: BackendService
    ) { }

  ngOnInit(): void {
    this.subscription = this.bs.getPageWithId(this.route.snapshot.params.id).subscribe(res => {
      this.page = res[0];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
