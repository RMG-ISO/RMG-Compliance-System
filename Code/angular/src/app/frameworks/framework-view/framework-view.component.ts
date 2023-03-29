import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FrameworkService } from '@proxy/frameworks';

@Component({
  selector: 'app-framework-view',
  templateUrl: './framework-view.component.html',
  styleUrls: ['./framework-view.component.scss']
})
export class FrameworkViewComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private frameworkService:FrameworkService
  ) { }

  frameworkId;
  frameWorkData;

  ngOnInit(): void {
    this.frameworkId = this.activatedRoute.snapshot.params.frameworkId;
    this.frameworkService.get(this.frameworkId).subscribe(fram => {
      console.log(fram);
      this.frameWorkData = fram
    })
  }

}
