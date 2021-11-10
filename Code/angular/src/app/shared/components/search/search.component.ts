import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output('search') search = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  timeOut
  change(value) {
    if(this.timeOut) clearTimeout(this.timeOut)
    this.timeOut = setTimeout(() => {
      // console.log(value);
      this.search.emit(value);
    }, 300)
  }
}
