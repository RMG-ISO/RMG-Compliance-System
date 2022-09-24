import { SessionStateService } from '@abp/ng.core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lang'
})
export class LangPipe implements PipeTransform {
  langKey = 'En';
  constructor(private sessionStateService:SessionStateService) {
    let lang = this.sessionStateService.getLanguage();
    if(lang == 'ar-EG') this.langKey = 'Ar'
  }

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? value[args[0] + this.langKey] : null;
  }

}
