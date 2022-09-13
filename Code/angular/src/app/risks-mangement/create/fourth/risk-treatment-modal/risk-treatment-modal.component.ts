import { IdentityUserService } from '@abp/ng.identity';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RiskTreatmentService } from '@proxy/RiskTreatments';
import { StaticDataService } from '@proxy/StaticData';
import { HistoryAction } from 'src/app/risks-mangement/module.enums';

@Component({
  selector: 'app-risk-treatment-modal',
  templateUrl: './risk-treatment-modal.component.html',
  styleUrls: ['./risk-treatment-modal.component.scss']
})
export class RiskTreatmentModalComponent implements OnInit {
  @Input('data') data = {} as any;
  @Input('ref') ref;

  form:FormGroup;

  StatusArr = [
    {
      "id": 1,
      "nameEn": "Waiting ",
      "nameAr": "قيد الانتظار "
    },
    {
      "id": 2,
      "nameEn": "Started ",
      "nameAr": "تم البدء"
    },
    {
      "id": 3,
      "nameEn": "In Progress",
      "nameAr": "في تقدم"
    },
    {
      "id": 4,
      "nameEn": "Completed ",
      "nameAr": "تمت"
    },
    {
      "id": 5,
      "nameEn": "Late",
      "nameAr": "متاخر"
    },
    {
      "id": 6,
      "nameEn": "Canceled ",
      "nameAr": "تم الالغاء"
    }
  ];
  Status = {};

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

    let id = this.activatedRoute.snapshot.params.treatmentId || this.data.id
    if(id) this.getTreatmentData(id);
    if(this.activatedRoute.snapshot.params.treatmentId) {
      this.form.disable();

      this.form.controls.achievementPercentage.enable();
      this.form.controls.attachmentId.enable();
    }

    for(let status of this.StatusArr) {
      this.Status[status.id] = status
    }

  }

  getTreatmentData(id) {
    this.riskTreatmentService.get(id).subscribe( (r:any) => {
      this.data = r;
      this.form.patchValue(r);
      this.form.controls.dueDate.patchValue( r.dueDate ? new Date( r.dueDate ) : new Date());
      
      if(this.activatedRoute.snapshot.params.treatmentId) {
        if(!r.startDate) this.form.controls.startDate.setValue(new Date())
        if(r.status == 1) this.form.controls.status.setValue(2);
      }
    });

  }

  
  OnFileUploaded(attachmentId: string) {
    this.form.controls["attachmentId"].patchValue(attachmentId);
  }

  uploading
  OnFileBeginUpload(beginUpload: boolean) {
    this.uploading = true;
  }

  OnFileEndUpload(endUpload: boolean) {
    this.uploading = false;
  }

  save() {
    if (this.form.invalid) return;
    const request = this.data.id ? this.riskTreatmentService.update(this.data.id, this.form.getRawValue()) : this.riskTreatmentService.create(this.form.getRawValue());
    request.subscribe(() => {
      this.close(this.data.id ? HistoryAction.UpdatePlanAction : HistoryAction.CreatePlanAction );
    });
  }


  close(action = null) {
    if(this.ref) this.ref.close(action);
    else this.router.navigate(['/risks-management/riskopportunity'])
  }
  
}
