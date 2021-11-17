import { AppLayoutService } from './../shared/services/app-layout.service';
import { Component, OnInit, AfterViewInit, ViewChild, HostListener} from '@angular/core';
import { LayoutService } from 'projects/theme-basic/src/lib/services/layout.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-compliance-layout',
  templateUrl: './compliance-layout.component.html',
  styleUrls: ['./compliance-layout.component.scss'],
  providers: [ LayoutService ],
})
export class ComplianceLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') drawer: MatDrawer;
  window = window;
  windowWidth:number;
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth = event.target.innerWidth;
  }
  constructor(
    public service: LayoutService,
    private appLayoutService: AppLayoutService,
  ) { }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
  }

  ngAfterViewInit() {
    this.service.subscribeWindowSize();
    this.drawer.openedChange.subscribe(t => this.appLayoutService.naveToggle.next(t) )
  }

}
