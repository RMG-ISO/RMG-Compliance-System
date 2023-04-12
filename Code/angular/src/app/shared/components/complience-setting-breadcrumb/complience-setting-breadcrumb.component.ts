import { Component, Input, OnInit } from '@angular/core';
import { BreadCrumbService, BreadCrumbSettingsType } from '@proxy/breadcrumbs';
import { BreadCrumbSettingsDto } from '@proxy/breadcrumbs/dtos';
import { FrameworkDto } from '@proxy/frameworks/dtos';

@Component({
  selector: 'app-complience-setting-breadcrumb',
  templateUrl: './complience-setting-breadcrumb.component.html',
  styleUrls: ['./complience-setting-breadcrumb.component.scss']
})
export class ComplienceSettingBreadcrumbComponent implements OnInit {

  @Input() type: BreadCrumbSettingsType;
  @Input() itemId: string;
  breadcrumb: BreadCrumbSettingsDto={};

  constructor(private breadCrumbService: BreadCrumbService) { }

  ngOnInit(): void {
    this.breadCrumbService.getBreadCrumbSettingsByInput({ type: this.type, id: this.itemId }).subscribe(result => {
      this.breadcrumb = result;
    })
  }

}
