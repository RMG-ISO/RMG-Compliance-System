import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '@proxy/frameworks';
import { InternalAuditQuestionsService } from '@proxy/InternalAuditQuestions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form:FormGroup;
  frameworks;
  constructor(
    private frameworkService:FrameworkService,
    private internalAuditQuestionsService:InternalAuditQuestionsService,

  ) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      menuTextAr:new FormControl(null, Validators.required),
      menuTextEn:new FormControl(null, Validators.required),
      isEditable:new FormControl(true, Validators.required),
      frameworkId:new FormControl(null, Validators.required),
      questionsIds:new FormControl(null, Validators.required),
      id:new FormControl(null, Validators.required),
    });

    this.frameworkService.getList({maxResultCount:null}).subscribe(result => this.frameworks = result.items);

  }

  frameworkChanged(id) {
    let filter = {maxResultCount:null, FrameworkId:id};
    this.internalAuditQuestionsService.getcheckListByFilter(filter).subscribe(r => {
      console.log(r);
    })
  }

}
