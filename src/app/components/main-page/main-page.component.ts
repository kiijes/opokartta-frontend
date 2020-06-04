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

  createIsToggled = false;

  loading = false;

  constructor(private bs: BackendService) { }

  ngOnInit(): void {
    this.subscription = this.bs.getPages().subscribe(res => {
      this.pages = res;
      this.loading = false;
    });
    this.bs.updatePages();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleEdit(id?: string) {
    if (!id) {
      this.editIsToggled = false;
      this.elementToEdit = null;
    } else {
      this.editIsToggled = true;
      this.elementToEdit = id;
    }
  }

  toggleCreate(): void {
    this.createIsToggled = !this.createIsToggled;
  }

  onEditSubmit(value: any): void {
    this.loading = true;
    this.bs.editPage(this.elementToEdit, value);
    this.toggleEdit();
  }

  onCreateSubmit(value: any): void {
    this.loading = true;
    this.bs.addPage(value);
    this.toggleCreate();
  }

  deletePage(id: string): void {
    const confirmDelete = confirm('Haluatko varmasti poistaa tämän dokumentin? Tätä muutosta ei voi peruuttaa.');
    if (!confirmDelete) {
      return;
    } else {
      this.loading = true;
      this.bs.deletePage(id);
    }
  }

}
