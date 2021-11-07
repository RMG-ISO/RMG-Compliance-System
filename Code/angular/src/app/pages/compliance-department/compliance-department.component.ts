import { Component, OnInit, ViewChild } from '@angular/core';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

@Component({
  selector: 'app-compliance-department',
  templateUrl: './compliance-department.component.html',
  styleUrls: ['./compliance-department.component.scss']
})
export class ComplianceDepartmentComponent implements OnInit {
  @ViewChild('table' ) table;
  settings = {
    pager:false,
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      },
      password: {
        title: 'Password'
      },
      test: {
        title: 'Test'
      },
      fake: {
        title: 'Fake'
      },
      fake1: {
        title: 'Fake'
      },
      fake2: {
        title: 'Fake'
      },
      fake3: {
        title: 'Fake'
      },
      fake4: {
        title: 'Fake'
      }
    }
  };

  data = [
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
    {
      id: 1,
      name: "Leanne Graham Leanne Graham Leanne Graham",
      username: "lorem ipsid fdj dfkja s;lds",
      email: "Sincere@april.biz",
      password:'sddsds',
      test:'sddsds',
      fake:'sddsds'
    },
  ];
  constructor(
    private mScrollbarService:MalihuScrollbarService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log(this.table)
    // this.mScrollbarService.initScrollbar('table', { axis: 'yx', theme: 'minimal-dark', scrollInertia:10, setHeight:true });
  }

}


