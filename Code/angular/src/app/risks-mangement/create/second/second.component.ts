import { Component, Input, OnInit } from '@angular/core';
import { StaticDataService } from '@proxy/StaticData';
import { RiskAndOpportunityService } from '@proxy/RiskAndOpportunity';
@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {
  @Input('form') form;

  constructor(
    private staticDataService:StaticDataService,
    private riskAndOpportunityService:RiskAndOpportunityService,
  ) { }

  ngOnInit(): void {
    this.getMatrixType();
    this.getList(2, 'likelihood');
    this.getList(5, 'controlAssesment');
    // this.getList(6, 'potentials');
    this.getListMatrix(this.NumberMatrix);
    this.Potential= this.form.value.potential;
    this.likelihood= this.form.value.likelihood;
    this.potentials.push(
      [{likelihood:4,impact:1,Potential:4,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:4,impact:2,Potential:8,levelNum:3,levelEn:'High',levelAr:'عالي'},{likelihood:4,impact:3,Potential:12,levelNum:4,levelEn:'Very High',levelAr:'عالي جدا'},{likelihood:4,impact:4,Potential:16,levelNum:4,levelEn:'Very High',levelAr:'عالي جدا'}],
      [{likelihood:3,impact:1,Potential:3,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:3,impact:2,Potential:6,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:3,impact:3,Potential:9,levelNum:3,levelEn:'High',levelAr:'عالي'},{likelihood:4,impact:4,Potential:16,levelNum:4,levelEn:'Very High',levelAr:'عالي جدا'}],
      [{likelihood:2,impact:1,Potential:2,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:2,impact:2,Potential:4,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:2,impact:3,Potential:6,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:2,impact:4,Potential:8,levelNum:3,levelEn:'High',levelAr:'عالي'}],
      [{likelihood:1,impact:1,Potential:1,levelNum:0,levelEn:'very Low',levelAr:'ضعيف جدا'},{likelihood:1,impact:2,Potential:2,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:1,impact:3,Potential:3,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:1,impact:4,Potential:4,levelNum:2,levelEn:'Medium',levelAr:'متوسط'}],);

  }

  potentials=[];
  ListMatrix=[];
  NumberMatrix=4;
  controlAssesment;
  likehood;
  impacts;
  likelihood;impact;Potential;
  getList(Type, key) {
    this.staticDataService.getList({Type:Type, search:null, maxResultCount:null }).subscribe(r => {
      this[key] = r.items;
    })
  }
  getListMatrix(Matrix) {
    this.riskAndOpportunityService.getMatrixType({NumberMatrix:Matrix }).subscribe(r => {

      this.likehood = r?.likehood;
      this.impacts = r?.impact;
    })
  }
  getMatrixType()
  {
    this.ListMatrix.push({id:3,nameEn:'Matrix 3*3',nameAr:'مصفوفة 3*3'});
    this.ListMatrix.push({id:4,nameEn:'Matrix 4*4',nameAr:'مصفوفة 4*4'});
  }
  changeMatrix(NumberMatrix:any)
  {
    if(NumberMatrix==3)
    {
      this.potentials=[];
     this.getListMatrix(NumberMatrix);
      this.potentials.push(
        [{likelihood:3,impact:1,Potential:3,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:3,impact:2,Potential:6,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:3,impact:3,Potential:9,levelNum:3,levelEn:'High',levelAr:'عالي'}],
        [{likelihood:2,impact:1,Potential:2,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:2,impact:2,Potential:4,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:2,impact:3,Potential:6,levelNum:2,levelEn:'Medium',levelAr:'متوسط'}],
        [{likelihood:1,impact:1,Potential:1,levelNum:0,levelEn:'very Low',levelAr:'ضعيف جدا'},{likelihood:1,impact:2,Potential:2,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:1,impact:3,Potential:3,levelNum:1,levelEn:'Low',levelAr:'ضعيف'}],);

    }
    if(NumberMatrix==4)
    {
      this.potentials=[];
      this.getListMatrix(NumberMatrix);
      this.potentials.push(
        [{likelihood:4,impact:1,Potential:4,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:4,impact:2,Potential:8,levelNum:3,levelEn:'High',levelAr:'عالي'},{likelihood:4,impact:3,Potential:12,levelNum:4,levelEn:'Very High',levelAr:'عالي جدا'},{likelihood:4,impact:4,Potential:16,levelNum:4,levelEn:'Very High',levelAr:'عالي جدا'}],
        [{likelihood:3,impact:1,Potential:3,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:3,impact:2,Potential:6,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:3,impact:3,Potential:9,levelNum:3,levelEn:'High',levelAr:'عالي'},{likelihood:4,impact:4,Potential:16,levelNum:4,levelEn:'Very High',levelAr:'عالي جدا'}],
        [{likelihood:2,impact:1,Potential:2,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:2,impact:2,Potential:4,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:2,impact:3,Potential:6,levelNum:2,levelEn:'Medium',levelAr:'متوسط'},{likelihood:2,impact:4,Potential:8,levelNum:3,levelEn:'High',levelAr:'عالي'}],
        [{likelihood:1,impact:1,Potential:1,levelNum:0,levelEn:'very Low',levelAr:'ضعيف جدا'},{likelihood:1,impact:2,Potential:2,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:1,impact:3,Potential:3,levelNum:1,levelEn:'Low',levelAr:'ضعيف'},{likelihood:1,impact:4,Potential:4,levelNum:2,levelEn:'Medium',levelAr:'متوسط'}],);

}

  }
  setValue(likelihood:any,impact:any,potential:any)
  {
    debugger;
    this.form.patchValue({
      likelihood:likelihood,
      impact:impact,
      potential:potential,
   });
   this.Potential= this.form.value.potential;
   this.likelihood= this.form.value.likelihood;
   this.getListMatrix(this.NumberMatrix);
  }




}
