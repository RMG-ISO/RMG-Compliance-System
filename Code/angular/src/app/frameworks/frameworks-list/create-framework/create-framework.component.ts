import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrameworkService } from '@proxy/frameworks';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { sharedStatusOptions } from '@proxy/shared';

@Component({
  selector: 'app-create-framework',
  templateUrl: './create-framework.component.html',
  styleUrls: ['./create-framework.component.scss'],
  host: { class:'app-dialog' }
})
export class CreateFrameworkComponent implements OnInit {
  @Input('data') data;
  @Input('mode') mode;
  @Input('ref') ref;
  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions
  constructor(
    private frameworkService:FrameworkService
  ) { }

  form:FormGroup;
  title;
  ngOnInit(): void {
    this.form = new FormGroup({
      nameAr: new FormControl(null, Validators.required),
      nameEn: new FormControl(null, Validators.required),
      shortcutAr: new FormControl(null, Validators.required),
      shortcutEn: new FormControl(null, Validators.required),
      descriptionAr: new FormControl(null),
      descriptionEn: new FormControl(null),
      status: new FormControl(null, Validators.required),
      id: new FormControl(null)
    });

    if(this.data) this.form.patchValue(this.data);
    this.title = '::' + this.mode + 'Framework';

  }

  save() {
    console.log(this.form);
    if (this.form.invalid) return;

    const request = this.data?.id
      ? this.frameworkService.update(this.data.id, this.form.value)
      : this.frameworkService.create(this.form.value);
    request.subscribe(() => {
      this.ref.close(true);
    });
  }

}
