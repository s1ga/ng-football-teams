import { inject, Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class ToasterService {
  private toastrService = inject(ToastrService);
  private readonly defaultOptions: Partial<IndividualConfig> = {
    closeButton: true,
    timeOut: 3000,
    disableTimeOut: 'extendedTimeOut',
    newestOnTop: true,
    tapToDismiss: true,
    positionClass: 'toast-top-center',
  };

  public showError(message?:string, title?: string, options?: Partial<IndividualConfig>): void {
    this.toastrService.error(message, title, { ...this.defaultOptions, ...options });
  }
}
