//import { getMatrix } from '@proxy/RiskAndOpportunity/dtos/models';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RiskAndOpportunityService } from '@proxy/risks';

@Component({
  selector: 'app-matrix[matrixNumber][form]',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
})
export class MatrixComponent implements OnInit, OnChanges {
  @Input('matrixNumber') matrixNumber = 4;
  @Input('form') form;
  @Input('view') view = false;

  potentials;

  potienital3 = [
    [
      { likelihood: 3, impact: 1, Potential: 3, levelNum: 1, levelEn: 'Low', levelAr: 'ضعيف' },
      { likelihood: 3, impact: 2, Potential: 6, levelNum: 2, levelEn: 'Medium', levelAr: 'متوسط' },
      { likelihood: 3, impact: 3, Potential: 9, levelNum: 3, levelEn: 'High', levelAr: 'عالي' },
    ],
    [
      { likelihood: 2, impact: 1, Potential: 2, levelNum: 1, levelEn: 'Low', levelAr: 'ضعيف' },
      { likelihood: 2, impact: 2, Potential: 4, levelNum: 2, levelEn: 'Medium', levelAr: 'متوسط' },
      { likelihood: 2, impact: 3, Potential: 6, levelNum: 2, levelEn: 'Medium', levelAr: 'متوسط' },
    ],
    [
      {
        likelihood: 1,
        impact: 1,
        Potential: 1,
        levelNum: 0,
        levelEn: 'very Low',
        levelAr: 'ضعيف جدا',
      },
      { likelihood: 1, impact: 2, Potential: 2, levelNum: 1, levelEn: 'Low', levelAr: 'ضعيف' },
      { likelihood: 1, impact: 3, Potential: 3, levelNum: 1, levelEn: 'Low', levelAr: 'ضعيف' },
    ],

    // [{likelihood:3,impact:1,Potential:3,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:3,impact:2,Potential:6,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:3,impact:3,Potential:9,levelNum:3,levelEn:'High',levelAr:'عالي'}],
    // [{likelihood:2,impact:1,Potential:2,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:2,impact:2,Potential:4,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:2,impact:3,Potential:6,levelNum:2,levelEn:'Medium',levelAr:'متوسط'}],
    // [{likelihood:1,impact:1,Potential:1,levelNum:0,levelEn:'very Low',levelAr:'ضعيف جدا'},{likelihood:1,impact:2,Potential:2,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:1,impact:3,Potential:3,levelNum:1,levelEn:'Low',levelAr:'ضعيف'}]
  ];
  potienital4 = [
    // [{likelihood:4,impact:1,Potential:4,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:4,impact:2,Potential:8,levelNum:3,levelEn:'High',levelAr:'عالي'},{likelihood:4,impact:3,Potential:12,levelNum:4,levelEn:'Very High',levelAr:'عالي جدا'},{likelihood:4,impact:4,Potential:16,levelNum:4,levelEn:'Very High',levelAr:'عالي جدا'}],
    // [{likelihood:3,impact:1,Potential:3,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:3,impact:2,Potential:6,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:3,impact:3,Potential:9,levelNum:3,levelEn:'High',levelAr:'عالي'},{likelihood:4,impact:4,Potential:16,levelNum:4,levelEn:'Very High',levelAr:'عالي جدا'}],
    // [{likelihood:2,impact:1,Potential:2,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:2,impact:2,Potential:4,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:2,impact:3,Potential:6,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:2,impact:4,Potential:8,levelNum:3,levelEn:'High',levelAr:'عالي'}],
    // [{likelihood:1,impact:1,Potential:1,levelNum:0,levelEn:'very Low',levelAr:'ضعيف جدا'},{likelihood:1,impact:2,Potential:2,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:1,impact:3,Potential:3,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:1,impact:4,Potential:4,levelNum:2,levelEn:'Medium',levelAr:'متوسط'}]
    [
      { likelihood: 4, impact: 1, Potential: 4, levelNum: 2, levelEn: 'Medium', levelAr: 'متوسط' },
      { likelihood: 4, impact: 2, Potential: 8, levelNum: 3, levelEn: 'High', levelAr: 'عالي' },
      {
        likelihood: 4,
        impact: 3,
        Potential: 12,
        levelNum: 4,
        levelEn: 'Very High',
        levelAr: 'عالي جدا',
      },
      {
        likelihood: 4,
        impact: 4,
        Potential: 16,
        levelNum: 4,
        levelEn: 'Very High',
        levelAr: 'عالي جدا',
      },
    ],
    [
      { likelihood: 3, impact: 1, Potential: 3, levelNum: 1, levelEn: 'Low', levelAr: 'ضعيف' },
      { likelihood: 3, impact: 2, Potential: 6, levelNum: 2, levelEn: 'Medium', levelAr: 'متوسط' },
      { likelihood: 3, impact: 3, Potential: 9, levelNum: 3, levelEn: 'High', levelAr: 'عالي' },
      {
        likelihood: 3,
        impact: 4,
        Potential: 12,
        levelNum: 4,
        levelEn: 'Very High',
        levelAr: 'عالي جدا',
      },
    ],
    [
      { likelihood: 2, impact: 1, Potential: 2, levelNum: 1, levelEn: 'Low', levelAr: 'ضعيف' },
      { likelihood: 2, impact: 2, Potential: 4, levelNum: 2, levelEn: 'Medium', levelAr: 'متوسط' },
      { likelihood: 2, impact: 3, Potential: 6, levelNum: 2, levelEn: 'Medium', levelAr: 'متوسط' },
      { likelihood: 2, impact: 4, Potential: 8, levelNum: 3, levelEn: 'High', levelAr: 'عالي' },
    ],
    [
      {
        likelihood: 1,
        impact: 1,
        Potential: 1,
        levelNum: 0,
        levelEn: 'very Low',
        levelAr: 'ضعيف جدا',
      },
      { likelihood: 1, impact: 2, Potential: 2, levelNum: 1, levelEn: 'Low', levelAr: 'ضعيف' },
      { likelihood: 1, impact: 3, Potential: 3, levelNum: 1, levelEn: 'Low', levelAr: 'ضعيف' },
      { likelihood: 1, impact: 4, Potential: 4, levelNum: 2, levelEn: 'Medium', levelAr: 'متوسط' },
    ],
  ];

  constructor(private riskAndOpportunityService: RiskAndOpportunityService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.matrixNumber.currentValue) this.changeMatrix(this.matrixNumber);
  }

  ngOnInit(): void {}

  likehood;
  impacts;
  getListMatrix(Matrix) {
    this.riskAndOpportunityService.getMatrixByMatrix(this.matrixNumber).subscribe(r => {
      this.likehood = r?.likehood;
      this.impacts = r?.impact;
    });
  }

  changeMatrix(number) {
    if (number == 3) this.potentials = this.potienital3;
    else this.potentials = this.potienital4;

    this.getListMatrix(number);
  }

  setValue(likelihood: any, impact: any, potential: any) {
    //  
    if (this.view) return;
    this.form.patchValue({
      likelihood: likelihood,
      impact: impact,
      potential: potential,
    });
    // this.getListMatrix(this.matrixNumber);
  }
}


