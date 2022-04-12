import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorTypeEnum } from '../enums/error-types.enum';
import { UtilitiesService } from './utilities.service';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandlerService {
  constructor(private _utilitiesService:UtilitiesService) {}

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case ErrorTypeEnum.UnAuthorized:
          this._utilitiesService.showNotification('error','UnAuthorized');
          break;
        case ErrorTypeEnum.UnAuthenticated:
          this._utilitiesService.showNotification('error','Please login first!');
          break;
        case ErrorTypeEnum.NotFound:
          this._utilitiesService.showNotification('error','Page not Found');
          break;
        case ErrorTypeEnum.BadRequest:
          this._utilitiesService.showNotification('error','Bad request, please try again later');
          break;
        case ErrorTypeEnum.NetworkOrServer:
          this._utilitiesService.showNotification('error','Bad network, please try again later');
          break;
        default:
          this._utilitiesService.showNotification('error','Error ! please try again later');
      }
    } else {
    }
  }
}
