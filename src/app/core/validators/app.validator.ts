import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Url } from '../interfaces/app.interfaces';

export class AppValidator {

  validateIsExists(urls: Url[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
            console.log(urls)

      const isExists = urls.find(url => url.ip === control.value);
      return !isExists ? null : {isExists: true};
    };
  }

  validateInvalidIp(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validator = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;
      const result = validator.test(control.value);
      return result ? null : {invalidIp: true};
    };
  }
}
