import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css']
})
export class ContentPageComponent implements OnInit {

  page$: Observable<any>;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public bs: BackendService
    ) { }

  ngOnInit(): void {
    this.page$ = this.bs.getPageWithId(this.route.snapshot.params.id);
  }

}
