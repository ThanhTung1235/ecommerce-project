import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { CustomValidateService } from '../../services/custom-validate.service';

@Directive({
  selector: '[phoneNumber]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PhoneNumberDirective, multi: true}]
})
export class PhoneNumberDirective {

  constructor(private customValidate : CustomValidateService) { }

  validate(control : AbstractControl):{[key : string] : any} | null{
    return this.customValidate.phonePattern()(control);
  }

}
