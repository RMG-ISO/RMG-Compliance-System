import { ToasterService } from '@abp/ng.theme.shared';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlService } from '@proxy/controls';
import { sharedStatusOptions } from '@proxy/shared';
import { finalize } from 'rxjs/operators';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-create-control',
  templateUrl: './create-control.component.html',
  styleUrls: ['./create-control.component.scss'],
  host: { class:'app-dialog' },
})
export class CreateControlComponent implements OnInit {
  @Input('data') data;
  @Input('mode') mode;
  @Input('ref') ref;
  @Input('mainControl') mainControl;
  @Input('subDomainId') subDomainId;
  @Input('frameWorkData') frameWorkData;

  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions;
  
  constructor(
    private controlService: ControlService,
    private toasterService:ToasterService


  ) { }

  form:FormGroup;



  departments;
  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      nameAr: new FormControl(null, Validators.required),
      nameEn: new FormControl(null, Validators.required),
      descriptionAr: new FormControl(null),
      descriptionEn: new FormControl(null),
      reference: new FormControl(null, Validators.required),
      domainId: new FormControl(this.subDomainId, Validators.required),
      // status: new FormControl(null, Validators.required),
      parentId: new FormControl(this.mainControl ? this.mainControl.id : null, this.mainControl ? Validators.required : null ),
    })

    if (this.data) this.form.patchValue(this.data);
  }

  isSaving = false;
  save() {
    console.log(this.form)
    if (this.form.invalid) return;
    this.isSaving = true;
    const request = this.data?.id
      ? this.controlService.update(this.data.id, this.form.getRawValue())
      : this.controlService.create(this.form.getRawValue());

    request
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe((res) => {
      this.toasterService.success('::SuccessfullySaved', "");
      this.ref.close(res);
    });
  }
}
