import { AbstractControl } from '@angular/forms';

export class PasswordMatchValidator {
  static matchPassword(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ matchPassword: true });
      return { matchPassword: true };
    } else {
      return null; // Return null when passwords match
    }
  }
}
