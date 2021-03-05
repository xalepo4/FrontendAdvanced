import {FormGroup} from '@angular/forms';

export class CheckPassword {
  public static checkInvalidPassword(frm: FormGroup): { mismatch: boolean } {
    return frm.controls.password.value === frm.controls.confirmPassword.value ? null : {mismatch: true};
  }
}
