import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '@proxy/frameworks';
import { InternalAuditQuestionsService } from '@proxy/InternalAuditQuestions';
import { InternalAuditChecklistService } from '@proxy/InternalAuditQuestionList/InternalAuditQuestionList.service';
import { ListService } from '@abp/ng.core';
import { ActivatedRoute } from '@angular/router';

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
  mode;
  id;
  selectedIds = {};
  constructor(
    private frameworkService:FrameworkService,
    private internalAuditQuestionsService:InternalAuditQuestionsService,
    private internalAuditChecklistService:InternalAuditChecklistService,
    public list:ListService,
    private activatedRoute:ActivatedRoute

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

    this.mode = this.activatedRoute.snapshot.data.mode;
    this.id = this.activatedRoute.snapshot.params.id
    if(this.id) {
      this.internalAuditChecklistService.get(this.id).subscribe(response => {
        this.form.patchValue(response);
        let questionsIds = response['internalAuditQuestions'].map(x => {
          this.selectedIds[x.id] = true;
          return x.id
        })
        this.form.controls.questionsIds.setValue(questionsIds.length ? questionsIds : null);
        this.internalAuditChecklistService.getQuestionByFramework(response['frameworkId']).subscribe( r => {
          this.items = r.items;
          this.totalCount = r.totalCount;
          let selected = [];
          for(let frame of r.items) {
            if(this.selectedIds[frame.id]) selected.push(frame);
          }
          this.selected = selected;
        })
      })
    }
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
    
    let ids = this.selected.map(x => x.id);

    this.form.controls.questionsIds.setValue(ids.length ? ids : null)
  }


  save() {
    console.log(this.form);
    this.form.markAllAsTouched();
    if(this.form.invalid) return;
    this.internalAuditChecklistService.create(this.form.value).subscribe(r => {
      console.log(r);
    })
  }

}
