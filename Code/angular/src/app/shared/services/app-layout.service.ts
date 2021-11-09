import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppLayoutService {
  sideNavToggle = new BehaviorSubject(1)
  constructor() { }
}
