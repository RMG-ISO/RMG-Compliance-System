import { IdentityUserService } from '@abp/ng.identity';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RiskTreatmentService } from '@proxy/RiskTreatments';
import { StaticDataService } from '@proxy/StaticData';
//import { Console } from 'console';
import { HistoryAction } from 'src/app/risks-mangement/module.enums';
import { DateValidators } from 'src/app/shared/validators/date-validator';
import { parseISO } from 'date-fns';
import * as moment from 'moment';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-risk-treatment-modal',
  templateUrl: './risk-treatment-modal.component.html',
  styleUrls: ['./risk-treatment-modal.component.scss']
})
export class RiskTreatmentModalComponent implements OnInit {
  @Input('data') data = {} as any;
  @Input('ref') ref;
  @Input('mode') mode;

  form:FormGroup;

  StatusArr

  constructor(
    private riskTreatmentService:RiskTreatmentService,
    private userService:IdentityUserService,
    private staticDataService:StaticDataService,
    private activatedRoute:ActivatedRoute,
    private router:Router,


  ) { }

  users;
  potentials;
  standards;
  oldStatus;
  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      riskOpportunityId: new FormControl(this.data.riskOpportunityId),
      responsibility: new FormControl(null, Validators.required),
      dueDate: new FormControl( null , Validators.required),
      mitigateActionPlanAr: new FormControl(null, Validators.required),
      mitigateActionPlanEn: new FormControl(null, Validators.required),
      actionDetailsAr: new FormControl(null, Validators.required),
      actionDetailsEn: new FormControl(null, Validators.required),
      startDate:new FormControl(null),
      achievementPercentage:new FormControl(null),
      status: new FormControl(1),
      attachmentId:new FormControl(null),
      completionDate:new FormControl(null),
    });

    this.userService.getList({maxResultCount:null, filter:null}).subscribe(r => {
      this.users = r.items
    });

    this.staticDataService.getList({Type:'3', search:null, maxResultCount:null }).subscribe(r => {
      this.potentials = r.items;
    })
    this.staticDataService.getList({Type:'9', search:null, maxResultCount:null }).subscribe(r => {
      this.standards = r.items;
    });

    let id = this.activatedRoute.snapshot.params.treatmentId || this.data.id;
    this.StatusArr = [
      {
        "id": 1,
        "nameEn": "Waiting",
        "nameAr": "قيد الانتظار ",
        isDisabled: id && !this.activatedRoute.snapshot.params.treatmentId
      },
      {
        "id": 2,
        "nameEn": "Started",
        "nameAr": "تم البدء",
        isDisabled:id && !this.activatedRoute.snapshot.params.treatmentId
      },
      {
        "id": 3,
        "nameEn": "In Progress",
        "nameAr": "في تقدم",
         isDisabled:id && !this.activatedRoute.snapshot.params.treatmentId
      },
      {
        "id": 4,
        "nameEn": "Completed",
        "nameAr": "تمت"
      },
      {
        "id": 5,
        "nameEn": "Late",
        "nameAr": "متاخر",
         isDisabled:id && !this.activatedRoute.snapshot.params.treatmentId
      },
      {
        "id": 6,
        "nameEn": "Canceled",
        "nameAr": "تم الالغاء"
      },
    ];

    if(id) this.getTreatmentData(id);

    if(this.activatedRoute.snapshot.params.treatmentId) {
      this.form.disable();
      this.form.controls.achievementPercentage.enable();
      this.form.controls.attachmentId.enable();
      this.form.controls.status.enable();
      this.form.controls.completionDate.enable();
      this.form.controls.startDate.enable();
    } else {
      this.form.controls.startDate.disable();
      this.form.controls.completionDate.disable();
      this.form.controls.achievementPercentage.disable();

      if(!id) this.form.controls.status.disable();
    }

  }

  getTreatmentData(id) {
    this.riskTreatmentService.get(id).subscribe( (r:any) => {
      r.startDate = r.startDate ? parseISO(r.startDate) : null;
      r.dueDate = r.dueDate ? parseISO(r.dueDate) : null;
      r.completionDate = r.completionDate ? parseISO(r.completionDate) : null;
      this.data = r;
      if(r.startDate) {
        this.form.controls.startDate.disable();
        this.form.controls.responsibility.disable();
      }

      this.form.patchValue(r);

      if(this.activatedRoute.snapshot.params.treatmentId) {

        this.form.controls.completionDate.setValidators(Validators.required);
        this.form.controls.startDate.setValidators(Validators.required);
        this.form.controls.achievementPercentage.setValidators([Validators.min(0), Validators.max(100)] )

        this.form.controls.completionDate.updateValueAndValidity();
        this.form.controls.startDate.updateValueAndValidity();
        this.form.controls.achievementPercentage.updateValueAndValidity();

        this.form.setValidators([ DateValidators.ValidateTwoDates('startDate', 'completionDate') ]);
        this.form.updateValueAndValidity();
      }
      console.log(this.mode);
      if(r.status == 4 || r.status == 6 || this.mode == FormMode.View) this.form.disable();
      this.oldStatus = r.status;
    });
  }


  OnFileUploaded(attachmentId: string) {
    console.log('OnFileUploaded')
    this.form.controls["attachmentId"].patchValue(attachmentId);
  }

  uploading
  OnFileBeginUpload(beginUpload: boolean) {
    console.log('OnFileBeginUpload')

    this.uploading = true;
  }

  OnFileEndUpload(endUpload: boolean) {
    console.log('OnFileEndUpload')

    this.uploading = false;
  }

  save() {
    if (this.form.invalid) return;
    let value = this.form.getRawValue();

    value.startDate = value.startDate ? moment(value.startDate).utc(true).toDate() : null;
    value.dueDate = value.dueDate ? moment(value.dueDate).utc(true).toDate() : null;
    value.completionDate = value.completionDate ? moment(value.completionDate).utc(true).toDate() : null;

    const request = this.data.id ? this.riskTreatmentService.update(this.data.id, value) : this.riskTreatmentService.create(value);
    request.subscribe(() => {
      this.close(this.data.id ? HistoryAction.UpdatePlanAction : HistoryAction.CreatePlanAction );
    });
  }


  close(action = null) {
    if(this.ref) this.ref.close(action);
    // else this.router.navigate(['/risks-management/riskopportunity'])
  }

  changeDate(event) {
    console.log(event);
    if(!this.activatedRoute.snapshot.params.treatmentId) return;
    if(new Date(this.form.controls.completionDate.value) > new Date(this.form.controls.dueDate.value)) {
      this.form.controls.status.setValue(5)
    } else this.form.controls.status.setValue(this.oldStatus)
  }
}
