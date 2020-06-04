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

  // variable for the Page document that is used to display data on the page
  page;
  // subscription that handles updating the page variable
  subscription: Subscription;
  // toggles the create form
  createIsToggled = false;
  // toggles the edit form
  editIsToggled = false;
  // identifies the element to edit
  elementToEdit: string;
  // boolean whether to show loading screen or not
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private bs: BackendService
    ) { }

  ngOnInit(): void {
    // Subscribes to the pageContentSubject in BackendService for updates
    this.subscription = this.bs.getPageContent().subscribe(res => {
      this.page = res;
      this.loading = false;
    });

    // Initial update call
    this.bs.updatePageContent(this.route.snapshot.params.id);
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

  onEditSubmit(id: string, pid: string, value: any): void {
    this.loading = true;
    this.bs.editPageContent(id, pid, value);
    this.toggleEdit();
  }

  onCreateSubmit(value: any): void {
    this.loading = true;
    this.bs.addPageContent(this.route.snapshot.params.id, value);
    this.toggleCreate();
  }

  toggleCreate(): void {
    this.createIsToggled = !this.createIsToggled;
  }

  deletePageContent(pid: string): void {
    const confirmDelete = confirm('Haluatko varmasti poistaa tämän dokumentin? Tätä muutosta ei voi peruuttaa.');
    if (!confirmDelete) {
      return;
    } else {
      this.loading = true;
      this.bs.deletePageContent(this.route.snapshot.params.id, pid);
    }
  }

  moveElement(id: string, pid: string, direction: string): void {
    this.loading = true;
    this.bs.movePageContent(id, pid, direction);
  }

}
