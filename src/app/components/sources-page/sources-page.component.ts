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

  loading = false;

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
      this.loading = false;
    });

    this.bs.updateSupportSources(
      this.route.snapshot.params.id,
      this.route.snapshot.params.pid);
  }

  /**
   * Create a FormGroup for a SupportSource document.
   */
  createFormGroup(): FormGroup {
    return this.fb.group({
      sourceName: ['', Validators.required],
      description: [''],
      phone: [''],
      links: this.fb.array([
        ['']
      ]),
      icon: this.fb.group({
        jamk: [false],
        jkl: [false],
        web: [false]
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
    // Set name, description, and phone
    this.editForm.patchValue({
      sourceName: source.sourceName,
      description: source.description,
      phone: source.phone
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
    this.loading = true;

    // Create a support source document
    const supportSource = {
      sourceName: this.createForm.value.sourceName,
      description: !this.createForm.value.description ? null : this.createForm.value.description,
      phone: !this.createForm.value.phone ? null : this.createForm.value.phone,
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

  onEditSubmit(pid: string, sid: string): void {
    this.loading = true;

    const supportSource = {
      sourceName: this.editForm.value.sourceName,
      description: !this.editForm.value.description ? null : this.editForm.value.description,
      phone: !this.editForm.value.phone ? null : this.editForm.value.phone,
      icon: [],
      link: this.editForm.value.links.length === 1 && this.editForm.value.links[0] === '' ? [] : this.editForm.value.links
    };
    Object.keys(this.editForm.value.icon).forEach((item) => {
      if (this.editForm.value.icon[item] === true) {
        supportSource.icon.push(item);
      }
    });

    for (let i = 0; i < supportSource.link.length; i++) {
      supportSource.link[i] = this.addPrefixIfMissing(supportSource.link[i]);
    }

    this.bs.editSupportSource(this.pageId, pid, sid, supportSource);
    this.toggleEdit();
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

  addPrefixIfMissing(link: string): string {
    const regex = new RegExp('^http(s)?:\/\/');
    return regex.test(link) ? link : 'https://' + link;
  }

  deleteSupportSource(pid: string, sid: string): void {
    const confirmDelete = confirm('Haluatko varmasti poistaa tämän dokumentin? Tätä muutosta ei voi peruuttaa.');
    if (!confirmDelete) {
      return;
    } else {
      this.loading = true;
      this.bs.deleteSupportSource(this.pageId, pid, sid);
    }
  }

  moveElement(pid: string, sid: string, direction: string): void {
    this.loading = true;
    this.bs.moveSupportSource(this.pageId, pid, sid, direction);
  }

}
