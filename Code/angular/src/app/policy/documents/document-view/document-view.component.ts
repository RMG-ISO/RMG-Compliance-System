import { Component } from '@angular/core';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent {
  activeComponent;
  changeRoute(component) {
    this.activeComponent = component;
    //component.frameWorkData = this.frameWorkData;
    component.parent = this;
  }
  
}
