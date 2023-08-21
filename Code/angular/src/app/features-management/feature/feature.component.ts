import { ConfigStateService, RoutesService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
  constructor(private config : ConfigStateService,
    private routerService : RoutesService) {}
  ngOnInit(): void {
    
  }

}
