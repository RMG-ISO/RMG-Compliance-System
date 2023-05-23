import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '@proxy/departments';
import { DomainService } from '@proxy/domains';
import { sharedStatusOptions } from '@proxy/shared';
import { finalize } from 'rxjs/operators';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-create-domain',
  templateUrl: './create-domain.component.html',
  styleUrls: ['./create-domain.component.scss'],
  host: { class:'app-dialog' },
})
export class CreateDomainComponent implements OnInit {
  @Input('data') data;
  @Input('mode') mode;
  @Input('ref') ref;
  @Input('mainDomain') mainDomain;
  @Input('frameWorkData') frameWorkData;

  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions;
  
  constructor(
    private departmentService: DepartmentService,
    private domainService: DomainService,

  ) { }

  form:FormGroup;



  departments;
  ngOnInit(): void {
    console.log(this.mainDomain)
    this.form = new FormGroup({
      id: new FormControl(null),
      nameAr: new FormControl(null, Validators.required),
      nameEn: new FormControl(null, Validators.required),
      descriptionAr: new FormControl(null),
      descriptionEn: new FormControl(null),
      reference: new FormControl(null, Validators.required),
      departmentIds: new FormControl({ value: this.mainDomain ? this.mainDomain.departments.map(t => t.id) : null , disabled: !!this.mainDomain }, Validators.required),
      frameworkId: new FormControl(this.frameWorkData.id, Validators.required),
      status: new FormControl(null, Validators.required),
      parentId: new FormControl( this.mainDomain ? this.mainDomain.id : null, this.mainDomain ? Validators.required : null),
    });
    if (this.data) {
      this.form.patchValue(this.data);
      this.form.get("departmentIds").setValue(this.data.departments.map(t => t.id));
    }


    this.departmentService.getDepartmentListLookup().subscribe(r => this.departments = r.items);

  }

  isSaving = false;
  save() {
    console.log(this.form)
    if (this.form.invalid) return;
    this.isSaving = true;
    const request = this.data?.id
      ? this.domainService.update(this.data.id, this.form.getRawValue())
      : this.domainService.create(this.form.getRawValue());

    request
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe((res) => {
      this.ref.close(res);
    });
  }
}
