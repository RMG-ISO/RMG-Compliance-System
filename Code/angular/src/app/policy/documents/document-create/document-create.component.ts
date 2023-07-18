import { ToasterService } from '@abp/ng.theme.shared';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigStateService } from '@abp/ng.core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { InternalAuditPreparationService } from '@proxy/InternalAuditPreparations';
import * as moment from 'moment';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-document-create',
  templateUrl: './document-create.component.html',
  styleUrls: ['./document-create.component.scss']
})
export class DocumentCreateComponent {

  mode;
  FormMode = FormMode;
  constructor(
    private configStateService:ConfigStateService,
    private activatedRoute:ActivatedRoute,
    private internalAuditPreparationService:InternalAuditPreparationService,
    private router:Router,
    private toasterService:ToasterService
  ) { }

  ngOnInit(): void {
    this.mode = this.activatedRoute.snapshot.data.mode;
    console.log(this.mode);
  }

}
