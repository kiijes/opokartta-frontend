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
    this.subscription = this.bs.getPages().subscribe(res => {
      this.pages = res;
    });
    this.bs.updatePages();
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
    this.bs.editPage(this.elementToEdit, value).subscribe(res => {
      console.log(res);
      this.bs.updatePages();
      this.setEdit();
    });
  }

}
