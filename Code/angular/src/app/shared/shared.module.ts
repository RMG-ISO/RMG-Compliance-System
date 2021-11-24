import { CoreModule, SubscriptionService } from '@abp/ng.core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgxValidateCoreModule } from '@ngx-validate/core';

import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatButtonModule } from "@angular/material/button";

import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatNativeDateModule } from "@angular/material/core";

import { MatMenuModule } from "@angular/material/menu";
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

import { MatStepperModule } from "@angular/material/stepper";
import { LayoutService } from 'projects/theme-basic/src/lib/services/layout.service';
import { SearchComponent } from './components/search/search.component';
import { FromNowPipe } from './pipe/from-now.pipe';
import { ComplienceSettingBreadcrumbComponent } from './components/complience-setting-breadcrumb/complience-setting-breadcrumb.component';
import { LangPipe } from './pipe/lang.pipe';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileSizePipe } from './pipe/file-size.pipe';
import { NgxdatatableCustomDirective } from './directives/ngxdatatable-custom.directive';
import { TableFilesComponent } from './components/table-files/table-files.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AssessmentFormComponent } from '../assessment/components/assessment-form/assessment-form.component';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    SearchComponent,
    FromNowPipe,
    ComplienceSettingBreadcrumbComponent,
    LangPipe,
    UploadFilesComponent,
    FileSizePipe,
    NgxdatatableCustomDirective,
    TableFilesComponent,
    AssessmentFormComponent,
  ],
  imports: [
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,


    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,

    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,

    MatMenuModule,

    MatStepperModule,
    NgSelectModule,
    NgbDatepickerModule,
  ],
  exports: [
    SearchComponent,
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    TableFilesComponent,
    ComplienceSettingBreadcrumbComponent,
    UploadFilesComponent,

    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,


    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,

    MatMenuModule,

    MatStepperModule,

    FromNowPipe,
    LangPipe,
    FileSizePipe,
    NgSelectModule,
    NgxdatatableCustomDirective,
    NgbDatepickerModule,
    AssessmentFormComponent,

  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    LayoutService,
    SubscriptionService
  ]
})
export class SharedModule {}
