import { FormMode } from './../../shared/interfaces/form-mode';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { SharedStatus } from '@proxy/shared';
import { FrameworkService } from '@proxy/frameworks';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-framework',
  templateUrl: './add-framework.component.html',
  styleUrls: ['./add-framework.component.scss']
})
export class AddFrameworkComponent implements OnInit {
  @Input('mode') mode;
  @Input('data') data;
  @Input('ref') ref;
  
  form:FormGroup;

  SharedStatus = SharedStatus
  FormMode = FormMode;
  
  constructor(
    private frameworkService:FrameworkService,
  ) { }

  ngOnInit(): void {
    console.log(this.mode);
    console.log(this.data);

    this.form = new FormGroup({
      nameAr: new FormControl(null, Validators.required),
      nameEn: new FormControl(null, Validators.required),
      shortcutAr: new FormControl(null, Validators.required),
      shortcutEn: new FormControl(null, Validators.required),
      descriptionAr: new FormControl(null, Validators.required),
      descriptionEn: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      id:new FormControl(null)
    })
    if(this.data) {
      this.form.patchValue(this.data);
      if(this.mode == FormMode.View) this.form.disable();
    }
  }

  save() {
    console.log(this.form)
    if(this.form.invalid) return;
    if(this.form.value.id) {
      this.frameworkService.update(this.form.value.id, this.form.value).subscribe(r => {
        console.log(r);
        this.ref.close(true);
      })
    } else {
      this.frameworkService.create(this.form.value).subscribe(r => {
        console.log(r);
        this.ref.close(true);
      })
    }
    
  }
}