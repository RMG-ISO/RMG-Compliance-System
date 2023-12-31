import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrameworkService } from '@proxy/frameworks';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { FrameworkStatus, sharedStatusOptions } from '@proxy/shared';
import { DepartmentService } from '@proxy/departments';
import { EmployeeService } from '@proxy/employees';
import { ToasterService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-create-framework',
  templateUrl: './create-framework.component.html',
  styleUrls: ['./create-framework.component.scss'],
  host: { class: 'app-dialog' },
})
export class CreateFrameworkComponent implements OnInit {
  @Input('data') data;
  @Input('mode') mode;
  @Input('ref') ref;
  FormMode = FormMode;
  sharedStatusOptions = sharedStatusOptions;
  constructor(
    private frameworkService: FrameworkService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private toasterService:ToasterService,

  ) {}

  form: FormGroup;
  title;
  activeTab = 1;

  departments;
  ngOnInit(): void {
    this.form = new FormGroup({
      frameInfo: new FormGroup({
        nameAr: new FormControl(null, Validators.required),
        nameEn: new FormControl(null, Validators.required),
        shortcutAr: new FormControl(null, Validators.required),
        shortcutEn: new FormControl(null, Validators.required),
        managementId: new FormControl(null, Validators.required),
        // status: new FormControl(null, Validators.required),
        frameworkStatus: new FormControl(FrameworkStatus.NewFramework),
        descriptionAr: new FormControl(null),
        descriptionEn: new FormControl(null),
        attachmentId: new FormControl(null),
        id: new FormControl(null),
      }),
      frameLevels: new FormGroup({
        levelFirstNameAr: new FormControl(null, Validators.required),
        levelFirstNameEn: new FormControl(null, Validators.required),
        levelSecondNameAr: new FormControl(null, Validators.required),
        levelSecondNameEn: new FormControl(null, Validators.required),
        levelThirdNameAr: new FormControl(null, Validators.required),
        levelThirdNameEn: new FormControl(null, Validators.required),
        levelFourNameAr: new FormControl(null, Validators.required),
        levelFourNameEn: new FormControl(null, Validators.required),
        hasPriority: new FormControl(false, Validators.required),
      }),
      frameTeam: new FormGroup({
        ownerId: new FormControl(null, Validators.required),
        reviewUserId: new FormControl(null, Validators.required),
        approveUserId: new FormControl(null, Validators.required),
        frameworkEmpsDto: new FormControl(null, Validators.required),
      }),
    });

    if (this.data) {
      let data = { ...this.data };
      if (data.frameworkEmpsDto) data.frameworkEmpsDto = data.frameworkEmpsDto.map(x => x.employeeId);

      this.form.controls.frameInfo.patchValue(data);
      this.form.controls.frameLevels.patchValue(data);
      this.form.controls.frameTeam.patchValue(data);
      console.log(data);
    }
    this.title = '::' + this.mode + 'Framework';

    this.getassets();
  }

  employees;
  getassets() {
    this.departmentService.getDepartmentListLookup().subscribe(r => {
      this.departments = r.items;
    });
    this.employeeService.getEmployeeListLookup().subscribe(r => {
      this.employees = r.items;
    });
  }

  changeSelection(val, key) {
    let control = this.form.controls.frameTeam['controls'][key];
    if (val && control.value == val) {
      control.setValue(null);
    }
  }

  isNextClicked = false;
  navNext() {
    this.isNextClicked = true;
    if (this.activeTab == 1 && this.form.controls.frameInfo.valid) this.activeTab += 1;
    else if (this.activeTab == 2 && this.form.controls.frameLevels.valid) this.activeTab += 1;

    setTimeout(() => (this.isNextClicked = false), 1000);
  }

  save() {
    // if(this.form.invalid && this.activeTab !== 3) {
    //   return;
    // } else if(this.form.valid && this.activeTab !== 3) this.activeTab += 1;
    if (this.form.invalid) return;
    let rawValue = this.form.getRawValue();

    let value = { ...rawValue.frameInfo, ...rawValue.frameLevels, ...rawValue.frameTeam };
    value.frameworkEmpsDto = value.frameworkEmpsDto.map(emp => {
      return {
        employeeId: emp,
        frameworkId: this.data?.id ? this.data?.id : '00000000-0000-0000-0000-000000000000',
      };
    });

    const request = this.data?.id
      ? this.frameworkService.update(this.data.id, value)
      : this.frameworkService.create(value);
    request.subscribe((r) => {
      this.toasterService.success('::SuccessfullySaved', "");

      this.ref.close(r);
    });
  }
}
