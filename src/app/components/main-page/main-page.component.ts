import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  pages$: Observable<any>;
  constructor(public bs: BackendService) { }

  ngOnInit(): void {
    this.pages$ = this.bs.getAllPages();
  }

}
