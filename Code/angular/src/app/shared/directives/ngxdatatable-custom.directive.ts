import { LocalizationService } from '@abp/ng.core';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, HostBinding, Inject, Input, OnDestroy } from '@angular/core';
import { ColumnMode, DatatableComponent, ScrollerComponent } from '@swimlane/ngx-datatable';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AppLayoutService } from '../services/app-layout.service';

@Directive({
  selector: 'ngx-datatable[appNgxdatatable]',
})

export class NgxdatatableCustomDirective implements AfterViewInit, OnDestroy {
  private subscription = new Subscription();

  private resizeDiff = 0;

  @Input() class = 'material bordered';

  @HostBinding('class')
  get classes(): string {
    return `ngx-datatable ${this.class}`;
  }

  constructor(
    private table: DatatableComponent,
    @Inject(DOCUMENT) private document: MockDocument,
    private appLayoutService: AppLayoutService,
    private localizationService: LocalizationService,
    private elementRef: ElementRef,
  ) {
    this.table.columnMode = ColumnMode.force;
    this.table.footerHeight = 50;
    this.table.headerHeight = 50;
    this.table.rowHeight = 'auto';
    this.table.scrollbarH = true;
    this.table.virtualization = false;
    this.table.messages.emptyMessage = this.localizationService.instant('::NoDataFound');
    // this.table._innerWidth = 


    // localizationService.get('::NoDataFound').subscribe(t => {
      
    // });
    // [messages]="{emptyMessage: ''}"

    // this.changes = new MutationObserver((mutations: MutationRecord[]) => {
    //   mutations.forEach((mutation: MutationRecord) => {
    //     const sideNavElement = mutation.target as HTMLElement;
    //     const tableElement = this.elementRef.nativeElement as HTMLElement;
    //     const isVisible = sideNavElement?.style.visibility === 'visible';
    //     if (this.wasVisible === undefined || this.wasVisible && !isVisible || !this.wasVisible && isVisible) {
    //       if (tableElement.style.width) {
    //         tableElement.style.width = `${NgxdatatableCustomDirective.floatOrZero(tableElement.style.width) + (isVisible ? -sideNavElement.offsetWidth : sideNavElement.offsetWidth)}px`;
    //         console.log('Already set before, now will be ', tableElement.style.width);
    //       }
    //       else {
    //         tableElement.style.width = `${tableElement.offsetWidth + (isVisible ? -sideNavElement.offsetWidth : sideNavElement.offsetWidth)}px`;
    //         console.log('Setting first time as ', tableElement.style.width);
    //       }
    //       this.table.recalculate();
    //     }
    //     this.wasVisible = isVisible;
    //   });
    // });

    // window.document.querySelectorAll('mat-sidenav[position="start"]').forEach(element => {
    //   this.changes.observe(element, { attributeFilter: ['style'] });
    // });

  }



//   private changes: MutationObserver;
//   wasVisible: boolean | undefined;

//   private static floatOrZero(value: any) {
//     const result = parseFloat(value);
//     return isNaN(result) ? 0 : result;
//   }

//   ngOnDestroy(): void {
//     this.changes.disconnect();
//   }



// ngAfterViewInit() {

// }





























  private fixHorizontalGap(scroller: ScrollerComponent) {
    const { body, documentElement } = this.document;

    if (documentElement.scrollHeight !== documentElement.clientHeight) {
      if (this.resizeDiff === 0) {
        this.resizeDiff = window.innerWidth - body.offsetWidth;
        scroller.scrollWidth -= this.resizeDiff;
      }
    } else {
      scroller.scrollWidth += this.resizeDiff;
      this.resizeDiff = 0;
    }
  }

  private fixStyleOnWindowResize() {
    // avoided @HostListener('window:resize') in favor of performance
    const subscription = fromEvent(window, 'resize')
      .pipe(debounceTime(500))
      .subscribe(() => {
        const { scroller } = this.table.bodyComponent;

        if (!scroller) return;

        this.fixHorizontalGap(scroller);
      });

    this.subscription.add(subscription);
  }

  ngAfterViewInit() {
    this.fixStyleOnWindowResize();
    //todo
    this.appLayoutService.naveToggle.subscribe(result => {
      console.log('naveToggle ', result);
      this.table.recalculate();
    });
    
    setTimeout(() => {
      console.log('this.table.recalculate')
      this.table.recalculate();
      console.log('this.table._innerWidth', this.table._innerWidth)
    }, 200)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

// fix: https://github.com/angular/angular/issues/20351
interface MockDocument {
  body: MockBody;
  documentElement: MockDocumentElement;
}

interface MockBody {
  offsetWidth: number;
}

interface MockDocumentElement {
  clientHeight: number;
  scrollHeight: number;
}
