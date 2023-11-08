import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  user = {
    email: '',
  };
  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit() {}

  async onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      this.toastr.success('Mail sent successfully!!.');
      await this.delay(2000);
      this.router.navigate(['/login']);
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
