import { eIdentityComponents } from '@abp/ng.identity';
import { IdentityRoleDto, IdentityUserService } from '@abp/ng.identity/proxy';
import { ToasterService } from '@abp/ng.theme.shared';
import { EXTENSIONS_IDENTIFIER, FormPropData, generateFormFromProps } from '@abp/ng.theme.shared/extensions';
import { Component, Injector, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

type NewType = FormGroup;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers:[
    {
      provide: EXTENSIONS_IDENTIFIER,
      useValue: eIdentityComponents.Users,
    },
  ]
})
export class CreateComponent {
  @Input('data') data;
  @Input('ref') ref;
  
  constructor(
    protected service: IdentityUserService,
    private toasterService:ToasterService,
    private fb:FormBuilder,
    private injector:Injector
  ) {

  }

  form:NewType;
  mode:FormMode;
  ngOnInit(): void {
    // this.form = new FormGroup({
    //   id: new FormControl(null),
    //   isDefault: new FormControl(null),
    //   isPublic: new FormControl(null),
    //   name: new FormControl(null, Validators.required),
    // });
    this.buildForm();

    this.mode = this.data ? FormMode.Edit : FormMode.Create;
    this.form.patchValue(this.data || {});
    if(this.data && this.data.isStatic) {
      this.form.disable();
    }

    console.log(this.form);


    console.log(this.data)
  }

  selectedUserRoles: IdentityRoleDto[] = [];
  roles: IdentityRoleDto[] = [];
  buildForm() {
    const data = new FormPropData(this.injector, this.data);
    console.log(data);
    this.form = generateFormFromProps(data);
    console.log(this.form.errors);

    this.service.getAssignableRoles().subscribe(({ items }) => {
      this.roles = items;
      if (this.roles) {
        this.form.addControl('roleNames', this.fb.array(this.roles.map(role => this.fb.group({
          [role.name]: [ this.data?.id ? !!this.selectedUserRoles?.find(userRole => userRole.id === role.id) : role.isDefault],
        }))));
      }
    });
}

  get roleGroups() {
    return (this.form.get('roleNames') as FormArray).controls;
  }



  isSaving = false;
  save() {
    if(this.form.invalid) return;

    this.isSaving = true;

    let value = {...this.form.getRawValue()};

    const request = this.data?.id ? this.service.update(this.data.id, value) : this.service.create(value);
    request
    .pipe(
      finalize(() => this.isSaving = false)
    ).subscribe((res) => {
      this.toasterService.success('::SuccessfullySaved', "");
      this.ref.close(res);
    });

    
  }



  
}
