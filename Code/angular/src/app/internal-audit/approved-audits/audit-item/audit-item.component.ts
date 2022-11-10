import { ActivatedRoute } from '@angular/router';
import { ConfigStateService } from '@abp/ng.core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { InternalAuditPreparationService } from '@proxy/InternalAuditPreparations';

@Component({
  selector: 'app-audit-item',
  templateUrl: './audit-item.component.html',
  styleUrls: ['./audit-item.component.scss']
})
export class AuditItemComponent implements OnInit {
  form:FormGroup;
  isSaving = false;
  auditInfo;
  constructor(
    private configStateService:ConfigStateService,
    private activatedRoute:ActivatedRoute,
    private internalAuditPreparationService:InternalAuditPreparationService,

  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      isApprove:new FormControl(true),
      // approveDate:new FormControl(),
      approveBy:new FormControl(this.configStateService.getAll().currentUser.id),
      causesRefuse:new FormControl({value:null, disabled:true}),
    });
    
    this.internalAuditPreparationService.getByID(this.activatedRoute.snapshot.params.id).subscribe(r => this.auditInfo = r)
  }

  changeSelection(ev) {
    console.log(ev);
    if(ev.value) this.form.controls.causesRefuse.setValue(null);

    ev.value ? this.form.controls.causesRefuse.disable() : this.form.controls.causesRefuse.enable();

    this.form.controls.causesRefuse.setValidators(ev.value ? null : Validators.required);
    this.form.controls.causesRefuse.updateValueAndValidity();
  }
}
