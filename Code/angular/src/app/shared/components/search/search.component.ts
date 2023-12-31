import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output('search') search = new EventEmitter();

  filterText: string = "";
  filterTextUpdate = new Subject<string>();

  constructor() { }

  ngOnInit(): void {
    this.filterTextUpdate.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        this.search.emit(value);
      });
  }

 }
