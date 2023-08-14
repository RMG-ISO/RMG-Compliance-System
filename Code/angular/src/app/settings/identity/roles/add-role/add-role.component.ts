import { IdentityRoleService } from '@abp/ng.identity/proxy';
import { ToasterService } from '@abp/ng.theme.shared';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
  host: { class:'app-dialog' },
})
export class AddRoleComponent implements OnInit {
  @Input('data') data;
  @Input('ref') ref;
  
  constructor(
    protected service: IdentityRoleService,
    private toasterService:ToasterService
  ) {

  }

  form:FormGroup;
  mode:FormMode;
  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      isDefault: new FormControl(false),
      isPublic: new FormControl(false),
      name: new FormControl(null, Validators.required),
    });

    this.mode = this.data ? FormMode.Edit : FormMode.Create;
    this.form.patchValue(this.data || {});
    if(this.data && this.data.isStatic) {
      this.form.disable();
    }

    console.log(this.data)
  }


  isSaving = false;
  save() {
    if(this.form.invalid) return;

    this.isSaving = true;

    let value = {...this.form.getRawValue()};

    const request = this.data?.id ? this.service.update(this.data.id, value) : this.service.create(value);
    request
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe((res) => {
      this.toasterService.success('::SuccessfullySaved', "");
      this.ref.close(res);
    });
  }
}
