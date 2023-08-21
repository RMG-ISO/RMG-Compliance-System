import { ToasterService } from '@abp/ng.theme.shared';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '@proxy/departments';
import { finalize } from 'rxjs';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  host: { class:'app-dialog' },
})
export class CreateComponent implements OnInit {


  @Input('data') data;
  @Input('ref') ref;
  
  constructor(
    private departmentService: DepartmentService,
    private toasterService:ToasterService
  ) {

  }
  
  form:FormGroup;
  mode;
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      id: new FormControl(null)
    });

    this.mode = this.data ? FormMode.Edit : FormMode.Create;
    this.form.patchValue(this.data || {});
    if(this.data && this.data.isStatic) {
      this.form.disable();
    }
  }

  isSaving = false;
  save() {
    if(this.form.invalid) return;

    this.isSaving = true;
    let value = {...this.form.getRawValue()};
    const request = this.data?.id ? this.departmentService.update(this.data.id, value) : this.departmentService.create(value);
    request
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe((res) => {
      this.toasterService.success('::SuccessfullySaved', "");
      this.ref.close(res);
    });
  }

}
