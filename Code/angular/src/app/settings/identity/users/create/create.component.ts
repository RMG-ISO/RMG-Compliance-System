import { eIdentityComponents } from '@abp/ng.identity';
import { IdentityRoleDto, IdentityUserService } from '@abp/ng.identity/proxy';
import { ToasterService, getPasswordValidators } from '@abp/ng.theme.shared';
import { EXTENSIONS_IDENTIFIER, FormPropData, generateFormFromProps } from '@abp/ng.theme.shared/extensions';
import { Component, Injector, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, switchMap } from 'rxjs';
import { FormMode } from 'src/app/shared/interfaces/form-mode';
import { APP_VALIDATION_BLUEPRINTS } from 'src/app/shared/validators/app-validations';
import { VALIDATION_BLUEPRINTS } from '@ngx-validate/core';

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
    {
      provide: VALIDATION_BLUEPRINTS,
      useValue: {
        ...APP_VALIDATION_BLUEPRINTS,
        pattern: '::Users:Dialog:Username:Pattern',
      },
    },
  ],
  host: { class:'app-dialog' },
})
export class CreateComponent {
  @ViewChild('rolesSelectionList') rolesSelectionList;
  @Input('ref') ref;
  @Input('data') data;
  @Input('allRoles') allRoles;

  form: FormGroup;
  roleFlags: Array<any> = [];
  assignedRoles: Array<any> = [];
  mode:FormMode;

  constructor(
    protected service: IdentityUserService,
    private toasterService:ToasterService,
    private _fb:FormBuilder,
    private injector:Injector
  ) {

  }

  ngOnInit(): void {
    this.form = this._fb.group({
      concurrencyStamp:[null],
      userName: this._fb.control(null, [Validators.required, Validators.pattern(/^[a-z][a-z0-9]*$/i)]),
      name: this._fb.control(null, Validators.required),
      surname: this._fb.control(null),
      email: this._fb.control(null, [Validators.required, Validators.email]),
      phoneNumber: this._fb.control(null),
      lockoutEnabled: this._fb.control(true, Validators.required),
      password: !this.data ? this._fb.control(null, [Validators.required, ...getPasswordValidators(this.injector)]) : this._fb.control(null, [...getPasswordValidators(this.injector)]),
      id:[null]
    });

    this.form.patchValue(this.data || {});

    this.getRoles();
  }



  selectedRoles: IdentityRoleDto[] = [];
  roles: IdentityRoleDto[] = [];
  getRoles() {
    if (this.data) this.form.updateValueAndValidity();


    if (this.data) {
      this.service.get(this.data.id)
      .pipe(
        switchMap((userData) => {
          this.form.reset();
          this.form.patchValue(userData);
          return this.service.getRoles(this.data.id)
        })
      )
      .subscribe(getRoles => {
        this.selectedRoles = getRoles.items;
        let selected = getRoles.items.map(x => x.name)
        for(let option of this.rolesSelectionList.options._results){
          if(selected.includes(option.value)) option.selected = true;
        }
      });
    } else {
      this.form.reset();
      this.form.controls.lockoutEnabled.patchValue(true);


      setTimeout(() => {
        this.selectedRoles = this.allRoles.filter(x => x.isDefault);
        let selected = this.selectedRoles.map(x => x.name)
        for(let option of this.rolesSelectionList.options._results){
          if(selected.includes(option.value)) option.selected = true;
        }
      }, 100)
    }
  }

  isSaving = false;
  showErrors = false;
  save() {
    console.log(this.form);
    if(this.form.invalid || !this.rolesSelectionList.selectedOptions.selected.length) {
      this.showErrors = true;
      return;
    }
    this.isSaving = true;
    let value = {...this.form.value};
    value.roleNames = [];
    for(let option of this.rolesSelectionList.selectedOptions.selected){
      value.roleNames.push(option.value)
    }
    (this.data ?  this.service.update(value.id, value) :  this.service.create(value))
    .pipe(
      finalize(() => this.isSaving = false)
    )
    .subscribe( () => {
      this.toasterService.success('::SuccessfullySaved', "");
      this.ref.close(true);
    });
  }

  
}
