import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// ** form imports
import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  // Function to handle form submission
  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      if (
        this.user.email === 'admin@gmail.com' &&
        this.user.password === 'admin@123'
      ) {
        this.toastr.success(
          'Welcome, Admin! You have successfully logged in.',
          'Success',
          { timeOut: 1000 }
        );
        this.authService.loginUser();
        // Redirect to the dashboard page after successful login
        this.router.navigate(['/dashboard/all-task']);
      } else {
        this.toastr.error(
          'Invalid email or password. Please try again.',
          'Error'
        );
      }
    } else {
      return;
    }
  }
}
