import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '@proxy/frameworks';
import { InternalAuditQuestionsService } from '@proxy/InternalAuditQuestions';
import { InternalAuditChecklistService } from '@proxy/InternalAuditQuestionList/InternalAuditQuestionList.service';
import { ListService } from '@abp/ng.core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers:[
    ListService
  ]
})
export class CreateComponent implements OnInit {

  form:FormGroup;
  frameworks;
  constructor(
    private frameworkService:FrameworkService,
    private internalAuditQuestionsService:InternalAuditQuestionsService,
    private internalAuditChecklistService:InternalAuditChecklistService,
    public list:ListService

  ) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      menuTextAr:new FormControl(null, Validators.required),
      menuTextEn:new FormControl(null, Validators.required),
      isEditable:new FormControl(true, Validators.required),
      frameworkId:new FormControl(null, Validators.required),
      questionsIds:new FormControl(null, Validators.required),
      id:new FormControl(null),
    });

    this.frameworkService.getList({maxResultCount:null}).subscribe(result => this.frameworks = result.items);
  }

  frameworkChanged(id) {
    // , FrameworkId:id
    let filter = {maxResultCount:null};
    const streamCreator = (query) => this.internalAuditQuestionsService.getListByFilter({ ...query, ...filter });
      this.list.hookToQuery(streamCreator).subscribe(r => {
      console.log(r);
      this.items = r.items;
      this.totalCount = r.totalCount;
    })
  }

  selected = [];
  totalCount;
  items;
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    
    this.form.controls.questionsIds.setValue(this.selected.map(x => x.id))
  }


  save() {
    console.log(this.form);
  }

}
