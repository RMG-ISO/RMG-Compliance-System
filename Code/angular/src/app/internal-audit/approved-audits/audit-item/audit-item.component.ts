import { ConfigStateService } from '@abp/ng.core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audit-item',
  templateUrl: './audit-item.component.html',
  styleUrls: ['./audit-item.component.scss']
})
export class AuditItemComponent implements OnInit {
  form:FormGroup;

  constructor(
    private configStateService:ConfigStateService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      isApprove:new FormControl(true),
      approveDate:new FormControl(),
      approveBy:new FormControl(this.configStateService.getAll().currentUser.id),
      causesRefuse:new FormControl(),
    });
    
  }

  changeSelection(ev) {
    console.log(ev);
    if(ev.value) this.form.controls.causesRefuse.setValue(null);

    this.form.controls.causesRefuse.setValidators(ev.value ? null : Validators.required);
    this.form.controls.causesRefuse.updateValueAndValidity();
  }
}
