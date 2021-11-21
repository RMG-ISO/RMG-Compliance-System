import { LocalizationService } from '@abp/ng.core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  constructor(
    private localizationService:LocalizationService
  ) {
    
  }

  transform(value: number, ...args: unknown[]): unknown {
    let KBValue: number = value / 1024;
    let result: string =  ' ' + this.localizationService.instant('::KB') ;

    if( KBValue > 500) {
      KBValue = KBValue / 1024 ;
      result = ' ' + this.localizationService.instant('::MB');
    }
    
    return KBValue.toFixed(1) + result ;
  }

}
