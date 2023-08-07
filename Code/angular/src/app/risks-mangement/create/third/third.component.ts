import { Type,WorkFlowStages } from './../../module.enums';
import { Component, Input, OnInit } from '@angular/core';
import { StaticDataService } from '@proxy/static-data';
import { RiskAndOpportunityService } from '@proxy/risks';
import { CreateComponent } from './../../create/create.component';
@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss'],
})
export class ThirdComponent implements OnInit {
  @Input('form') form;
  @Input('itemData') itemData;
  Type = Type;
  constructor(
    private staticDataService: StaticDataService,
    private createComponent:CreateComponent,
    private riskAndOpportunityService: RiskAndOpportunityService
  ) {}

  // potentials;
  // Potential;
  // likelihood;
  // Treatments = [];
  // riskTreatment;
  ngOnInit(): void {
    // let NumberMatrix = this.form.value.numberMatrix;
    // this.Potential = this.form.value.potential;
    // this.likelihood = this.form.value.likelihood;
    // this.changeMatrix(NumberMatrix);
  }
  // ListMatrix = [];
  // NumberMatrix = 4;
  // controlAssesment;
  // likehood;
  // impacts;
  // changeMatrix(NumberMatrix: any) {
  //   if (NumberMatrix == 3) {
  //     this.potentials = [];
  //     this.getListMatrix(NumberMatrix);
  //     this.potentials.push(
  //       [
  //         { likelihood: 3, impact: 1, Potential: 3, levelNum: 1, levelEn: 'Low', levelAr: 'ضعيف' },
  //         {
  //           likelihood: 3,
  //           impact: 2,
  //           Potential: 6,
  //           levelNum: 2,
  //           levelEn: 'Medium',
  //           levelAr: 'متوسط',
  //         },
  //         { likelihood: 3, impact: 3, Potential: 9, levelNum: 3, levelEn: 'High', levelAr: 'عالي' },
  //       ],
  //       [
  //         { likelihood: 2, impact: 1, Potential: 2, levelNum: 1, levelEn: 'Low', levelAr: 'ضعيف' },
  //         {
  //           likelihood: 2,
  //           impact: 2,
  //           Potential: 4,
  //           levelNum: 2,
  //           levelEn: 'Medium',
  //           levelAr: 'متوسط',
  //         },
  //         {
  //           likelihood: 2,
  //           impact: 3,
  //           Potential: 6,
  //           levelNum: 2,
  //           levelEn: 'Medium',
  //           levelAr: 'متوسط',
  //         },
  //       ],
  //       [
  //         {
  //           likelihood: 1,
  //           impact: 1,
  //           Potential: 1,
  //           levelNum: 0,
  //           levelEn: 'very Low',
  //           levelAr: 'ضعيفا',
  //         },
  //         { likelihood: 1, impact: 2, Potential: 2, levelNum: 1, levelEn: 'Low', levelAr: 'ضعيف' },
  //         { likelihood: 1, impact: 3, Potential: 3, levelNum: 1, levelEn: 'Low', levelAr: 'ضعيف' },
  //       ]
  //     );
  //   }
  //   if (NumberMatrix == 4) {
  //     this.potentials = [];
  //     this.getListMatrix(NumberMatrix);
  //     this.potentials.push(
  //       [
  //         {
  //           likelihood: 4,
  //           impact: 1,
  //           Potential: 4,
  //           levelNum: 2,
  //           levelEn: 'Medium',
  //           levelAr: 'متوسط',
  //         },
  //         { likelihood: 4, impact: 2, Potential: 8, levelNum: 3, levelEn: 'High', levelAr: 'عالي' },
  //         {
  //           likelihood: 4,
  //           impact: 3,
  //           Potential: 12,
  //           levelNum: 4,
  //           levelEn: 'Very High',
  //           levelAr: 'عالي جدا',
  //         },
  //         {
  //           likelihood: 4,
  //           impact: 4,
  //           Potential: 16,
  //           levelNum: 4,
  //           levelEn: 'Very High',
  //           levelAr: 'عالي جدا',
  //         },
  //       ],
  //       [
  //         { likelihood: 3, impact: 1, Potential: 3, levelNum: 1, levelEn: 'Low', levelAr: 'ضعيف' },
  //         {
  //           likelihood: 3,
  //           impact: 2,
  //           Potential: 6,
  //           levelNum: 2,
  //           levelEn: 'Medium',
  //           levelAr: 'متوسط',
  //         },
  //         { likelihood: 3, impact: 3, Potential: 9, levelNum: 3, levelEn: 'High', levelAr: 'عالي' },
  //         {
  //           likelihood: 3,
  //           impact: 4,
  //           Potential: 12,
  //           levelNum: 4,
  //           levelEn: 'Very High',
  //           levelAr: 'عالي جدا',
  //         },
  //       ],
  //       [
  //         { likelihood: 2, impact: 1, Potential: 2, levelNum: 1, levelEn: 'Low', levelAr: 'ضعيف' },
  //         {
  //           likelihood: 2,
  //           impact: 2,
  //           Potential: 4,
  //           levelNum: 2,
  //           levelEn: 'Medium',
  //           levelAr: 'متوسط',
  //         },
  //         {
  //           likelihood: 2,
  //           impact: 3,
  //           Potential: 6,
  //           levelNum: 2,
  //           levelEn: 'Medium',
  //           levelAr: 'متوسط',
  //         },
  //         { likelihood: 2, impact: 4, Potential: 8, levelNum: 3, levelEn: 'High', levelAr: 'عالي' },
  //       ],
  //       [
  //         {
  //           likelihood: 1,
  //           impact: 1,
  //           Potential: 1,
  //           levelNum: 0,
  //           levelEn: 'very Low',
  //           levelAr: 'ضعيف جدا',
  //         },
  //         { likelihood: 1, impact: 2, Potential: 2, levelNum: 1, levelEn: 'Low', levelAr: 'ضعيف' },
  //         { likelihood: 1, impact: 3, Potential: 3, levelNum: 1, levelEn: 'Low', levelAr: 'ضعيف' },
  //         {
  //           likelihood: 1,
  //           impact: 4,
  //           Potential: 4,
  //           levelNum: 2,
  //           levelEn: 'Medium',
  //           levelAr: 'متوسط',
  //         },
  //       ]
  //     );
  //   }
  // }

  // getListMatrix(Matrix) {
  //   this.riskAndOpportunityService.getMatrixType({ NumberMatrix: Matrix }).subscribe(r => {
  //     this.likehood = r?.likehood;
  //     this.impacts = r?.impact;
  //   });
  // }



}
