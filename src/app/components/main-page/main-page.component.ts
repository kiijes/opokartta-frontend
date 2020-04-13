import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {

  pages;
  subscription: Subscription;

  editIsToggled = false;
  elementToEdit: string;

  constructor(private bs: BackendService) { }

  ngOnInit(): void {
    this.subscription = this.bs.getAllPages().subscribe(res => {
      this.pages = res;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setEdit(id?: string) {
    if (!id) {
      this.editIsToggled = false;
      this.elementToEdit = null;
    } else {
      this.editIsToggled = true;
      this.elementToEdit = id;
    }
  }

  onSubmit(value: any): void {
    console.log(value);
    this.setEdit();
  }

}
