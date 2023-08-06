import { ToasterService } from '@abp/ng.theme.shared';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '@proxy/documents';
import { finalize } from 'rxjs';
import { DateValidators } from 'src/app/shared/validators/date-validator';

@Component({
  selector: 'app-principles-compliance-dialog',
  templateUrl: './principles-compliance-dialog.component.html',
  styleUrls: ['./principles-compliance-dialog.component.scss']
})
export class PrinciplesComplianceDialogComponent implements OnInit {
  @Input('employees') employees;
  @Input('documentId') documentId;
  @Input('ref') ref;

  form:FormGroup;

  constructor(
    private documentService:DocumentService,
    private toasterService:ToasterService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      documentId: new FormControl(this.documentId, Validators.required),
      responsibleId: new FormControl(null, Validators.required),
      scheduledStartDate: new FormControl(null, Validators.required),
      scheduledEndDate: new FormControl(null, Validators.required),
    },
    {
      validators:[
        DateValidators.MinDate('scheduledStartDate'),
        DateValidators.ValidateTwoDates('scheduledStartDate', 'scheduledEndDate')
      ]
    })
  }


  isSaving;
  save() {
    console.log(this.form);
    if(this.form.invalid) return;
    this.isSaving = true;
    this.documentService.sendPrinciplesForComplianceByInput(this.form.value)
    .pipe(
      finalize(() => this.isSaving = false)
    )
    .subscribe(r => {
      console.log(r);
      this.toasterService.success('::SendForEvaluationSucc', "");
      this.ref.close(true)
    })
  }
}
