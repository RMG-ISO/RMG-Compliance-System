import { ListService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrameworkService } from '@proxy/frameworks';
import { VALIDATION_BLUEPRINTS, VALIDATION_TARGET_SELECTOR } from '@ngx-validate/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[
    ListService,
    // {
    //   provide:'VALIDATION_TARGET_SELECTOR',
    //   useValue:'form-group'
    // }
  ]
})
export class ListComponent implements OnInit {
  searchVal
  frameworks;
  form:FormGroup;
  isModalOpen;

  constructor(
    public list:ListService,
    private frameworkService:FrameworkService
  ) { }

  ngOnInit(): void {
    this.frameworkService.getList({maxResultCount:null}).subscribe(result => this.frameworks = result.items);
  }

  // delete(model: FrameworkDto) {
  //   this.confirmation.warn('::FrameworkDeletionConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [model.nameAr] }).subscribe((status) => {
  //     if (status === Confirmation.Status.confirm) {
  //       this.frameworkService.delete(model.id).subscribe(() => this.list.get());
  //     }
  //   });
  // }



  openDialog(data?) {
    this.selected = data;
    this.buildForm();
    this.isModalOpen = true;
  }

  selected;
  buildForm() {
    this.form = new FormGroup({
      questionTextAr: new FormControl(null, Validators.required),
      questionTextEn: new FormControl(null, Validators.required),
      frameworkId: new FormControl(null, Validators.required),
      id: new FormControl(null)
    })
    this.form.patchValue(this.selected);
  }

  save() {
    // if (this.form.invalid) {
    //   return;
    // }

    // const request = this.selected?.id
    //   ? this.frameworkService.update(this.selected.id, this.form.value)
    //   : this.frameworkService.create(this.form.value);

    // request.subscribe(() => {
    //   this.isModalOpen = false;
    //   this.form.reset();
    //   this.list.get();
    // });
  }

}
