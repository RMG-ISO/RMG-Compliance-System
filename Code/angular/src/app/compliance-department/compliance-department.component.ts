import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-compliance-department',
  templateUrl: './compliance-department.component.html',
  styleUrls: ['./compliance-department.component.scss']
})
export class ComplianceDepartmentComponent implements OnInit {

  @ViewChild('myTable') table: any;

  rows: any[] = [];
  expanded: any = {};
  timeout: any;

  columns = [
    {
      name:'المرجع',
      prop:'reference'
    },
    {
      name:'الدومين بالعربية',
      prop:'domain_ar'
    },
    {
      name:'الدومين بالإنجليزية',
      prop:'domain_en'
    },
    {
      name:'التحكمات الفرعية',
      prop:'subControls'
    },
    {
      name:'الحالة',
      prop:'status'
    },
    {
      name:'آخر تحديث',
      prop:'lastUpdate'
    }
  ]

  constructor() {
    this.rows = [
      {
        "id": 0,
        reference:1.1,
        domain_ar:"استراتيجية الأمن السيبراني 1.1",
        domain_en:"Cyber ​​Security Strategy 1.1",
        subControls:"4 تحكمات فرعية لتحكمات الفرعية",
        status:'مفعل',
        lastUpdate:"منذ 14 يوم",
      },
    ];
  }
  ngOnInit(): void {
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

}
