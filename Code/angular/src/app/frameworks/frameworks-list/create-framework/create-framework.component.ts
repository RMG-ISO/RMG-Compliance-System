import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FrameworkService } from '@proxy/frameworks';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { sharedStatusOptions } from '@proxy/shared';
import { DepartmentService } from '@proxy/departments';

@Component({
  selector: 'app-create-framework',
  templateUrl: './create-framework.component.html',
  styleUrls: ['./create-framework.component.scss'],
  host: { class:'app-dialog' },
})
export class CreateFrameworkComponent implements OnInit {
  @Input('data') data;
  @Input('mode') mode;
  @Input('ref') ref;
  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions
  constructor(
    private frameworkService:FrameworkService,
    private departmentService:DepartmentService
  ) { }

  form:FormGroup;
  title;
  activeTab = 1;


  departments;
  ngOnInit(): void {
    this.form = new FormGroup({
      frameInfo:new FormGroup({
        nameAr: new FormControl(null, Validators.required),
        nameEn: new FormControl(null, Validators.required),
        shortcutAr: new FormControl(null, Validators.required),
        shortcutEn: new FormControl(null, Validators.required),
        department: new FormControl(null, Validators.required),
        status: new FormControl(null, Validators.required),
        descriptionAr: new FormControl(null),
        descriptionEn: new FormControl(null),
        id: new FormControl(null),
      }),
      frameLevels: new FormGroup({
        level1_ar:new FormControl(null, Validators.required),
        level1_en:new FormControl(null, Validators.required),
        level2_ar:new FormControl(null, Validators.required),
        level2_en:new FormControl(null, Validators.required),
        level3_ar:new FormControl(null, Validators.required),
        level3_en:new FormControl(null, Validators.required),
        level4_ar:new FormControl(null, Validators.required),
        level4_en:new FormControl(null, Validators.required),
      }),
      frameTeam:new FormGroup({
        owner:new FormControl(null, Validators.required),
        reviewer:new FormControl(null, Validators.required),
        approver:new FormControl(null, Validators.required),
        team:new FormControl(null, Validators.required)
      })
    });

    if(this.data) this.form.patchValue(this.data);
    this.title = '::' + this.mode + 'Framework';

    this.departmentService.getDepartmentListLookup().subscribe(r => {
      console.log(r);
      this.departments = r.items;
    })
  }


  isNextClicked = false;
  navNext() {
    this.isNextClicked = true;
    if(this.activeTab == 1 && this.form.controls.frameInfo.valid) this.activeTab += 1;
    else if (this.activeTab == 2 && this.form.controls.frameLevels.valid) this.activeTab += 1;

    setTimeout(() => this.isNextClicked = false, 1000)
  }

  save() {
    console.log(this.isNextClicked)
    // if(this.form.invalid && this.activeTab !== 3) {
    //   return;
    // } else if(this.form.valid && this.activeTab !== 3) this.activeTab += 1;
    console.log(this.form);
    return;
    if (this.form.invalid) return;

    const request = this.data?.id
      ? this.frameworkService.update(this.data.id, this.form.value)
      : this.frameworkService.create(this.form.value);
    request.subscribe(() => {
      this.ref.close(true);
    });
  }

  submit() {
    console.log('submit')
  }

}
