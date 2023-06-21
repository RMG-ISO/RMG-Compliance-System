import { ConfigStateService, ListService, LocalizationService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '@proxy/domains';
import { FrameworkService } from '@proxy/frameworks';
import { ComplianceStatus, FrameworkStatus, SharedStatus, sharedStatusOptions } from '@proxy/shared';
import { finalize } from 'rxjs/operators';
import { FormMode } from 'src/app/shared/interfaces/form-mode';

@Component({
  selector: 'app-framework-view',
  templateUrl: './framework-view.component.html',
  styleUrls: ['./framework-view.component.scss'],
  providers:[
    ListService
  ]
})
export class FrameworkViewComponent implements OnInit {
  @ViewChild('frameDialog') frameDialog;
  @ViewChild('domainDialog') domainDialog;
  @ViewChild('refuseCauseDialog') refuseCauseDialog;
  @ViewChild('reviewAlert') reviewAlert;
  @ViewChild('reviewDecisionAlert') reviewDecisionAlert;

  dateFormat = 'yyyy/MM/dd'
  dateTimeFormat = 'yyyy/MM/dd HH:mm'
  SharedStatus = SharedStatus;
  FormMode = FormMode;
  activeTab = 'details';
  activeSubTab = 'statistics';

  SharedFrameworkStatus = FrameworkStatus;
  sharedStatusOptions = sharedStatusOptions;
  
  ComplianceStatus = ComplianceStatus;

  constructor(
    public  activatedRoute:ActivatedRoute,
    private frameworkService:FrameworkService,
    private router:Router,
    private domainService: DomainService,
    public readonly list: ListService,
    public  matDialog: MatDialog,
    private confirmation: ConfirmationService,
    private localizationService:LocalizationService,
    private configState:ConfigStateService
  ) { }

  frameworkId;
  frameWorkData;

  currentLang;
  userId;


  parentPath;
  showButton = false;
  ChartOptions1;
  ChartOptions2;
  ChartOptions3;
  ChartOptions4;
  ngOnInit(): void {
    this.parentPath = this.activatedRoute.snapshot.parent.routeConfig.path;

    this.currentLang = this.localizationService.currentLang;

    this.frameworkId = this.activatedRoute.snapshot.params.frameworkId;
    this.frameworkService.get(this.frameworkId).subscribe(fram => {
      this.frameWorkData = fram;

      this.showButton = fram.complianceStatus === ComplianceStatus.NotStarted && this.parentPath !== 'compliance-assessment';
      this.getMainDomainsList();
    });

    this.userId = this.configState.getAll().currentUser.id;




    let xAxisData = [];
    let data1 = [];
    let data2 = [];
    let data3 = [];
    for (let i = 0; i < 10; i++) {
      xAxisData.push('Class' + i);
      data1.push({value:+(Math.random() * 2).toFixed(2),name:'dasdasd'});
      data2.push({value:+(Math.random() * 5).toFixed(2),name:'dasdasd'});
      data3.push({value:+(Math.random() + 0.3).toFixed(2),name:'dasdasd'});
      //data4.push(+Math.random().toFixed(2));
    }


    var emphasisStyle = {
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0,0,0,0.3)'
      }
    };

    this.ChartOptions1  = {
      color: ["#acd836", "#57dcc0"],

      legend: {
        data: ['عدد ضوابط المجال', 'عدد الإمتثال'],
        left: '10%',
        right: '5%'
      },
  
      tooltip: {},
      xAxis: {
        data: xAxisData,
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false }
      },
      yAxis: {},
      grid: {
        bottom: 100
      },
      series: [
        {
          name: 'عدد ضوابط المجال',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data1,
          barWidth: 15,
        },
        {
          name: 'عدد الإمتثال',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
      
      ]
    };

    this.ChartOptions2  = {
      color: ["#528fe1","#acd836"],

      legend: {
        data: [ 'عدد الإمتثال','عدد ضوابط المجال'],
        left: '10%',
        right: '5%'
      },
  
      tooltip: {},
      xAxis: {
        data: xAxisData,
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false }
      },
      yAxis: {},
      grid: {
        bottom: 100
      },
      series: [
        {
          name: 'عدد الإمتثال',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data1,
          barWidth: 15,
        },
        {
          name: 'عدد ضوابط المجال',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
      
      ]
    };

    this.ChartOptions3  = {
      color: ["#528fe1","#1cae40","#57dcc0"],

      legend: {
        data: [ 'Priority (1)','Priority (2)','Priority (3)'],
        left: '10%',
        right: '5%'
      },
  
      tooltip: {},
      xAxis: {
        data: xAxisData,
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false }
      },
      yAxis: {},
      grid: {
        bottom: 100
      },
      series: [
        {
          name: 'Priority (1)',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data1,
          barWidth: 15,
        },
        {
          name: 'Priority (2)',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
        {
          name: 'Priority (3)',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
      ]
    };
    
    this.ChartOptions4  = {
      color: ["#f20000","#fc6d80","#f3b230","#f0e929","#92d53b","#4fa765"],
      //color: ["#4fa765","#92d53b","#f0e929","#f3b230","#fc6d80","#f20000"],

      legend: {
        //data: ['ﻧﺎﺿﺞ','ﻣُﻘﺎس','ﻣُﻔﻌﻞ','ﻣُﻌﺮف','أوﻟﻰ','ﻻ ﻳﻨﻄﺒﻖ'],
        data: ['ﻻ ﻳﻨﻄﺒﻖ','أوﻟﻰ','ﻣُﻌﺮف','ﻣُﻔﻌﻞ','ﻣُﻘﺎس','ﻧﺎﺿﺞ'],
        left: '10%',
        right: '5%'
      },
  
      tooltip: {},
      xAxis: {
        data: xAxisData,
        axisLine: { onZero: true },
        splitLine: { show: false },
        splitArea: { show: false }
      },
      yAxis: {},
      grid: {
        bottom: 100
      },
      series: [
        {
          name: 'ﻧﺎﺿﺞ',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data1,
          barWidth: 15,
        },
        {
          name: 'ﻣُﻘﺎس',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
        {
          name: 'ﻣُﻔﻌﻞ',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
        {
          name: 'ﻣُﻌﺮف',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
        {
          name: 'أوﻟﻰ',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
        {
          name: 'ﻻ ﻳﻨﻄﺒﻖ',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2,
          barWidth: 15,
        },
      ]
    };
   /*  this.the_options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Email',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'Search Engine',
          type: 'bar',
          data: [862, 1018, 964, 1026, 1679, 1600, 1570],
          emphasis: {
            focus: 'series'
          },
          markLine: {
            lineStyle: {
              type: 'dashed'
            },
            data: [[{ type: 'min' }, { type: 'max' }]]
          }
        },
        {
          name: 'Baidu',
          type: 'bar',
          barWidth: 5,
          stack: 'Search Engine',
          emphasis: {
            focus: 'series'
          },
          data: [620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
          name: 'Google',
          type: 'bar',
          stack: 'Search Engine',
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 290, 230, 220]
        },
        {
          name: 'Bing',
          type: 'bar',
          stack: 'Search Engine',
          emphasis: {
            focus: 'series'
          },
          data: [60, 72, 71, 74, 190, 130, 110]
        },
        {
          name: 'Others',
          type: 'bar',
          stack: 'Search Engine',
          emphasis: {
            focus: 'series'
          },
          data: [62, 82, 91, 84, 109, 110, 120]
        }
      ]
    }; */
  }

  selectedToDelete = {};
  deleteLength = 0;
  selectChanged(checked, id){
    this.selectedToDelete[id] = checked;
    this.deleteLength = checked ? this.deleteLength + 1 : this.deleteLength - 1;
  }

  deleteItems(){
    // deleteSelectedItem
    this.confirmation.warn('::DeleteSelectedItem', '::AreYouSure')
    .subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        let toDeleteIds = [];
        for(let key in this.selectedToDelete) {
          if(this.selectedToDelete[key]) toDeleteIds.push(key)
        }
        this.domainService.deleteManyByIds(toDeleteIds).subscribe(r => {
          this.getMainDomainsList();
        })
      }
    });
  }


  mainDomainsItems;
  allReadyForRevision = true;
  allDomainsApproved = true;
  getMainDomainsList(search = null) {
    const bookStreamCreator = (query) => this.domainService.getListWithoutPaging({ ...query, isMainDomain: true, search: search, frameworkId: this.frameworkId, maxResultCount:null });
    this.list.hookToQuery(bookStreamCreator).subscribe((response) => {
      this.mainDomainsItems = response.items;
      response.items.map(item => {
        if(item.complianceStatus !== ComplianceStatus.ReadyForRevision) this.allReadyForRevision = false;
        if(item.complianceStatus !== ComplianceStatus.Approved) this.allDomainsApproved = false;
      });
      this.selectedToDelete = {};
      this.deleteLength = 0;
    });
  }


  form:FormGroup;

  changeCreateFrameStatus(cond) {
    if(cond) this.frameworkService.sendToReviewerById(this.frameWorkData.id).subscribe(r => {
      window.location.reload();
    })
  }

  changeReviewFrameStatus(cond, ngSelect) {
    if(cond == undefined) return;

    if(cond) {
      this.frameworkService.sendToOwnerById(this.frameWorkData.id).subscribe(r => {
        window.location.reload();
      });
      return;
    }

    this.form = new FormGroup({
      reason: new FormControl(null, Validators.required)
    });

    let ref = this.matDialog.open(this.refuseCauseDialog);
    ref.afterClosed().subscribe(con => {
      if(con) {
        this.frameworkService.returnToCreatorByIdAndInput(this.frameWorkData.id, this.form.value).subscribe(r => {
          window.location.reload();
        });
      } else ngSelect.clearModel();
    })
  }

  changeApproveFrameStatus(cond, ngSelect) {
    if(cond == undefined) return;

    if(cond) {
      this.frameworkService.approveById(this.frameWorkData.id).subscribe(r => {
        window.location.reload();
      });
      return;
    }

    this.form = new FormGroup({
      reason: new FormControl(null, Validators.required)
    });

    let ref = this.matDialog.open(this.refuseCauseDialog);
    ref.afterClosed().subscribe(con => {
      if(con) {
        this.frameworkService.returnToCreatorByIdAndInput(this.frameWorkData.id, this.form.value).subscribe(r => {
          window.location.reload();
        });
      } else ngSelect.clearModel();
    })
  }

  isSendingStatus = false;
  changeFrameActivityStatus(cond) {
    if(cond == undefined) return;
    this.isSendingStatus = true;
    
    let func = cond == SharedStatus.Active ? this.frameworkService.activateById : this.frameworkService.deactivateById;
    func(this.frameWorkData.id)
    .pipe( finalize(() => this.isSendingStatus = false) )
    .subscribe(r => {
      window.location.reload();
    })
  }

  openFrameDialog(mode = FormMode.Create) {
    let ref = this.matDialog.open(this.frameDialog, {
      data:{
        data:this.frameWorkData,
        mode
      },
      disableClose:true
    });
    ref.afterClosed().subscribe(con => {
      if(con) {
        this.frameWorkData = con;
        this.list.get();
      }
    })
  }
  

  openDomainDialog(data = null, mode = FormMode.Create, mainDomain, subDomainsTable) {
    let ref = this.matDialog.open(this.domainDialog, {
      data:{
        data,
        mode,
        mainDomain
      },
      disableClose:true
    });
    ref.afterClosed().subscribe(con => {
      if(con) {
        if(subDomainsTable) subDomainsTable.list.get();
        else this.list.get();
      }
    })
  }


  OnFileUploaded(attachmentId: string) {
    if(this.frameWorkData.attachmentId) return;

    this.frameWorkData.attachmentId = attachmentId;

    let data = {...this.frameWorkData};

    if (data.frameworkEmpsDto) data.frameworkEmpsDto = data.frameworkEmpsDto.map(emp => {
      return {
        employeeId: emp.employeeId,
        frameworkId: this.frameWorkData?.id ? this.frameWorkData?.id : '00000000-0000-0000-0000-000000000000',
      };
    });
    this.frameworkService.update(this.frameWorkData.id, data).subscribe(r => {
      this.frameWorkData = r;
    })
  }

  uploading
  OnFileBeginUpload(beginUpload: boolean) {
    this.uploading = true;
  }

  OnFileEndUpload(endUpload: boolean) {
    this.uploading = false;
  }

  sendForInternalAssessment() {
    this.frameworkService.sendForInternalAssessmentById(this.frameWorkData.id).subscribe(r => window.location.reload());
  }


  startInternalAssessmentById(mainDomain) {
    this.domainService.startInternalAssessmentById(mainDomain.id).subscribe(r => {
      // mainDomain.complianceStatus = ComplianceStatus.UnderInternalAssessment;
      this.getMainDomainsList();
    })
  }

  endInternalAssessmentById(mainDomain) {
    this.domainService.endInternalAssessmentById(mainDomain.id).subscribe(r => {
      this.getMainDomainsList();
      // mainDomain.complianceStatus = ComplianceStatus.ReadyForRevision;
    })
  }

  startReview(mainDomain) {
    let ref = this.matDialog.open(this.reviewAlert, {
      disableClose:true,
      panelClass:['app-dialog', 'confirm-alert']
    });

    ref.afterClosed().subscribe(con => {
      if(con) {
        this.domainService.startReviewById(mainDomain.id).subscribe(r => {
         this.getMainDomainsList();
        })
      }
    })
  }

  sendToOwner(mainDomain) {
    this.domainService.sendToOwnerById(mainDomain.id).subscribe(r => {
      this.getMainDomainsList();
     })
  }

  reviewForm:FormGroup;
  takeReviewDecision(mainDomain) {
    this.reviewForm = new FormGroup({
      action: new FormControl(null, Validators.required)
    });

    let ref = this.matDialog.open(this.reviewDecisionAlert, {
      disableClose:true,
      panelClass:['app-dialog', 'confirm-alert']
    });

    ref.afterClosed().subscribe(con => {
      if(con) {
        (this.reviewForm.value.action ? this.domainService.approveComplianceById(mainDomain.id) : this.domainService.returnToResponsibleById(mainDomain.id) )
        .subscribe(r => {
         this.getMainDomainsList();
        })
      }
    })

  }

  approveFramework() {
    this.frameworkService.approveComplianceById(this.frameWorkData.id).subscribe( r => {
      window.location.reload();
    })
  }
}
