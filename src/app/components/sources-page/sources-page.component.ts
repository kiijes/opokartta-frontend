import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sources-page',
  templateUrl: './sources-page.component.html',
  styleUrls: ['./sources-page.component.css']
})
export class SourcesPageComponent implements OnInit, OnDestroy {

  pageContent;
  pageId;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private bs: BackendService
    ) { }

  ngOnInit(): void {
    this.pageId = this.route.snapshot.params.id;
    this.subscription = this.bs.getPageContentWithId(
      this.route.snapshot.params.id,
      this.route.snapshot.params.pid).subscribe(res => {
        this.pageContent = res;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
