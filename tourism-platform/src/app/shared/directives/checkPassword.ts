import {FormGroup} from '@angular/forms';

export class CheckPassword {
  // tslint:disable-next-line:typedef
  public static checkInvalidPassword(frm: FormGroup) {
    return frm.controls.password.value === frm.controls.confirmPassword.value ? null : {mismatch: true};
  }
}
