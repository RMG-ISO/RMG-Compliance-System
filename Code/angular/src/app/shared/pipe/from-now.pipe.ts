import { SessionStateService } from '@abp/ng.core';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {


  constructor(    private sessionState: SessionStateService
    ) {
     }
  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? moment(value).locale(this.sessionState.getLanguage()).fromNow() : null;
    // if(value)
    // return moment(value).locale(this.sessionState.getLanguage()).fromNow();
    // else return null;
  }

}
