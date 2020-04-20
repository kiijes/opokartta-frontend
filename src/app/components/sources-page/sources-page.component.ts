import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sources-page',
  templateUrl: './sources-page.component.html',
  styleUrls: ['./sources-page.component.css']
})
export class SourcesPageComponent implements OnInit, OnDestroy {

  pageContent;
  pageId;
  subscription: Subscription;

  createIsToggled = false;

  editIsToggled = false;
  elementToEdit: string = null;

  createForm: FormGroup;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private bs: BackendService,
    private fb: FormBuilder
    ) {
      this.createForm = this.createFormGroup();
      this.editForm = this.createFormGroup();
    }

  ngOnInit(): void {
    this.pageId = this.route.snapshot.params.id;
    this.subscription = this.bs.getSupportSources().subscribe(res => {
      this.pageContent = res;
    });

    this.bs.updateSupportSources(
      this.route.snapshot.params.id,
      this.route.snapshot.params.pid);
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      sourceName: ['', Validators.required],
      description: [''],
      links: this.fb.array([
        this.fb.control('')
      ]),
      icon: this.fb.group({
        jamk: this.fb.control(false),
        jkl: this.fb.control(false),
        web: this.fb.control(false)
      })
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleCreate(): void {
    this.createIsToggled = !this.createIsToggled;
    this.createForm.reset();
    this.createFormLinks.clear();
    this.createFormLinks.push(this.fb.control(''));
  }

  toggleEdit(source?: any): void {
    if (source) {
      this.setEditForm(source);
    }
    if (this.elementToEdit === null) {
      this.elementToEdit = source._id;
    } else {
      this.elementToEdit = null;
      this.clearEditForm();
    }
    this.editIsToggled = !this.editIsToggled;
  }

  setEditForm(source: any): void {
    // Set name and description
    this.editForm.patchValue({
      sourceName: source.sourceName,
      description: source.description
    });

    // Set links
    for (let i = 0; i < source.link.length; i++) {
      if (i === 0) {
        this.editFormLinks.setControl(0, this.fb.control(source.link[i]));
      } else {
        this.addEditLink(source.link[i]);
      }
    }

    // Toggle checkboxes
    Object.keys(this.editForm.value.icon).forEach(item => {
      for (const icon of source.icon) {
        if (item === icon) {
          this.editForm.patchValue({
            icon: {
              [item]: true
            }
          });
          break;
        }
      }
    });
  }

  clearEditForm(): void {
    this.editForm = this.createFormGroup();
  }

  onCreateSubmit(pid: string): void {
    // Create a support source document
    const supportSource = {
      sourceName: this.createForm.value.sourceName,
      description: !this.createForm.value.description ? null : this.createForm.value.description,
      icon: [],
      link: this.createForm.value.links.length === 1 && this.createForm.value.links[0] === '' ? [] : this.createForm.value.links
    };
    // Go through keys to see which icons were toggled,
    // then add the toggled ones to the array
    Object.keys(this.createForm.value.icon).forEach((item) => {
      if (this.createForm.value.icon[item] === true) {
        supportSource.icon.push(item);
      }
    });
    this.bs.addSupportSource(this.pageId, pid, supportSource);
    this.toggleCreate();
  }

  onEditSubmit(): void {

  }

  get createFormLinks() {
    return this.createForm.get('links') as FormArray;
  }

  get editFormLinks() {
    return this.editForm.get('links') as FormArray;
  }

  addCreateLink(): void {
    this.createFormLinks.push(this.fb.control(''));
  }

  addEditLink(link?: string): void {
    if (link) {
      this.editFormLinks.push(this.fb.control(link));
    } else {
      this.editFormLinks.push(this.fb.control(''));
    }
  }

  removeCreateLink(i: number): void {
    this.createFormLinks.removeAt(i);
  }

  removeEditLink(i: number): void {
    this.editFormLinks.removeAt(i);
  }

  deleteSupportSource(pid: string, sid: string): void {
    const confirmDelete = confirm('Do you really want to delete this document?');
    if (!confirmDelete) {
      return;
    } else {
      this.bs.deleteSupportSource(this.pageId, pid, sid);
    }
  }

}
