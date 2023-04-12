import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FrameworkService } from '@proxy/frameworks';
import { SharedStatus } from '@proxy/shared';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-framework-view',
  templateUrl: './framework-view.component.html',
  styleUrls: ['./framework-view.component.scss']
})
export class FrameworkViewComponent implements OnInit {

  SharedStatus = SharedStatus;

  constructor(
    public activatedRoute:ActivatedRoute,
    private frameworkService:FrameworkService,
    private router:Router
  ) { }

  frameworkId;
  frameWorkData;

  ngOnInit(): void {
    this.frameworkId = this.activatedRoute.snapshot.params.frameworkId;
    this.frameworkService.get(this.frameworkId).subscribe(fram => {
      console.log(fram);
      this.frameWorkData = fram
    });


    this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
      // map(() => this.activatedRoute),
      // map((route) => {
      //   console.log('route pre-while: ', route); // Shows ActivatedRoute object
      //   console.log('pre-while route child: ', route.firstChild); // null
      //   while (route.firstChild) {
      //     console.log('while route: ', route);
      //     route = route.firstChild; // Conditional if needed in scenario
      //   }
      //   console.log('post while route: ', route);
      //   return route;
      // })
    )
    .subscribe((elem) => {
      console.log('elem: ', elem);
    });

  }

  routeChanges(ev) {
    console.log(ev);
  }

}
