import { LocalizationParam } from "@abp/ng.core";
import { Confirmation, DEFAULT_ERROR_LOCALIZATIONS, ErrorHandler, ErrorScreenErrorCodes, HttpErrorWrapperComponent } from "@abp/ng.theme.shared";
import { ApplicationRef, ComponentRef, EmbeddedViewRef, Injectable, Injector } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs/internal/Observable";
import { Subject } from "rxjs";
import { ErrorInterceptComponent } from "./shared/components/error-intercept/error-intercept.component";



let ERROR_MESSAGES = {
    defaultError: {
      title: 'An error has occurred!',
      details: 'Error detail not sent by server.',
    },
    defaultError401: {
      title: 'You are not authenticated!',
      details: 'You should be authenticated (sign in) in order to perform this operation.',
    },
    defaultError403: {
      title: 'You are not authorized!',
      details: 'You are not allowed to perform this operation.',
    },
    defaultError404: {
      title: 'Resource not found!',
      details: 'The resource requested could not found on the server.',
    },
    defaultError500: {
      title: 'Internal server error',
      details: 'Error detail not sent by server.',
    },
  };
  
let ERROR_LOCALIZATIONS = {
    defaultError: {
      title: 'AbpUi::DefaultErrorMessage',
      details: 'AbpUi::DefaultErrorMessageDetail',
    },
    defaultError401: {
      title: 'AbpUi::DefaultErrorMessage401',
      details: 'AbpUi::DefaultErrorMessage401Detail',
    },
    defaultError403: {
      title: '::DefaultErrorMessage403',
      details: 'AbpUi::DefaultErrorMessage403Detail',
    },
    defaultError404: {
      title: 'AbpUi::DefaultErrorMessage404',
      details: 'AbpUi::DefaultErrorMessage404Detail',
    },
    defaultError500: {
      title: 'AbpUi::500Message',
      details: 'AbpUi::DefaultErrorMessage',
    },
  };
  
@Injectable({ providedIn: 'root' })
export class AppErrorHandler extends ErrorHandler {
    get matDialog() {
        return this.injector.get(MatDialog)
    }
    constructor(
        injector:Injector,
    ){
        super(injector);
        // ERROR_LOCALIZATIONS
        for(let key in DEFAULT_ERROR_LOCALIZATIONS) {
            DEFAULT_ERROR_LOCALIZATIONS[key] = ERROR_LOCALIZATIONS[key];
        }
        
    }


    showError(
        message: LocalizationParam,
        title: LocalizationParam,
      ): Observable<any> {
        let ref = this.matDialog.open(ErrorInterceptComponent, {
            data:{
                title: title as any,
                content: message.toString().replace('\r', '').replace('\n', '<br>')
            }
        })
        return ref.afterClosed();
    }


    createErrorComponent(instance) {
        this.matDialog.open(ErrorInterceptComponent, {
          data:{
                title: instance.title['key'] as any,
                // title: 'AbpUi::DefaultErrorMessage404',
                content: instance.details['key']
            }
        })
    }

}
