import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class CustomValidateService {
  constructor() {}

  urlPartern(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }

      let valid = control.value.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g);
      
      return valid ? null : { invalidParten: true };
    };
  }

  phonePattern(): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      let valid = control.value.match(vnf_regex);
      return valid ? null : { invalidPhonePattern: true };
    };
  }
}
