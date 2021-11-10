import { SessionStateService } from '@abp/ng.core';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

  
  constructor(    private sessionState: SessionStateService
    ) {
      // console.log(sessionState)
      // console.log(sessionState.getLanguage())
      // console.log(moment('2021/11/10 03:08:23 pm','YYYY/MM/DD hh:mm:ss a').locale(sessionState.getLanguage()).fromNow())
      // console.log(moment().format('YYYY/MM/DD hh:mm:ss a'))
  }
  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value)
    if(value)
    return moment(value).locale(this.sessionState.getLanguage()).fromNow();
    else return null;
  }

}
