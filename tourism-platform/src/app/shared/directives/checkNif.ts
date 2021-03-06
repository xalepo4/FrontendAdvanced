import {AbstractControl} from '@angular/forms';

export class CheckNif {
  public static checkInvalidNif(control: AbstractControl): { invalid: boolean } {
    const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    const nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKET';
    const inputUppercase = control.value.toString().toUpperCase();

    // if DNI is empty return as correct because is a not required field
    if (inputUppercase === '') {
      return null;
    }

    if (!nifRexp.test(inputUppercase) && !nieRexp.test(inputUppercase)) {
      return {invalid: true};
    }

    const nie = inputUppercase
      .replace(/^[X]/, '0')
      .replace(/^[Y]/, '1')
      .replace(/^[Z]/, '2');

    const letter = inputUppercase.substr(-1);
    const charIndex = parseInt(nie.substr(0, 8), 10) % 23;

    if (letters.charAt(charIndex) === letter) {
      return null;
    }

    return {invalid: true};
  }
}
