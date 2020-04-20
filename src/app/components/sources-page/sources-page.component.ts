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

  createForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private bs: BackendService,
    private fb: FormBuilder
    ) {
      this.createForm = this.fb.group({
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

  ngOnInit(): void {
    this.pageId = this.route.snapshot.params.id;
    this.subscription = this.bs.getSupportSources().subscribe(res => {
      this.pageContent = res;
    });

    this.bs.updateSupportSources(
      this.route.snapshot.params.id,
      this.route.snapshot.params.pid);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleCreate(): void {
    this.createIsToggled = !this.createIsToggled;
    this.createForm.reset();
    this.links.clear();
    this.links.push(this.fb.control(''));
  }

  onCreateSubmit(): void {
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
    console.log(supportSource);
    this.toggleCreate();
  }

  get links() {
    return this.createForm.get('links') as FormArray;
  }

  addLink(): void {
    this.links.push(this.fb.control(['']));
  }

  removeLink(): void {
    this.links.removeAt(this.links.length - 1);
  }

}
