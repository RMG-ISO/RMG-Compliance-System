import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppLayoutService {
  naveToggle = new Subject();
  constructor() { }
}