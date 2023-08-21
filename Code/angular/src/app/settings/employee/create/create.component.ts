import { ToasterService } from '@abp/ng.theme.shared';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '@proxy/employees';
import { finalize } from 'rxjs';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  host: { class:'app-dialog' },
})
export class CreateComponent {
  @Input('data') data;
  @Input('ref') ref;
  @Input('departments') departments;
  
  constructor(
    private employeeService: EmployeeService,
    private toasterService:ToasterService
  ) {

  }

  form:FormGroup;
  mode:FormMode;
  ngOnInit(): void {
    this.form = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      email: new FormControl({value:null, disabled:true}, [Validators.required, Validators.email]),
      departmentId: new FormControl(null, Validators.required),
      isManager: new FormControl(false, Validators.required),
    })

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

    const request = this.data?.id ? this.employeeService.update(this.data.id, value) : this.employeeService.create(value);
    request
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe((res) => {
      this.toasterService.success('::SuccessfullySaved', "");
      this.ref.close(res);
    });

    
  }
}
