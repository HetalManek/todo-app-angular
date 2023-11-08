import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PasswordMatchValidator } from '../../shared/confirm-password.validators';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: [" ", Validators.required],
      email: [" ", [Validators.required, Validators.email]],
      password: [" ", [Validators.required, Validators.minLength(6)]],
      confirmPassword: [" ", Validators.required],
    },
    {
      validator:PasswordMatchValidator.matchPassword,
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  // Function to handle form submission
  onSubmit(){
    this.submitted = true;
    if (this.signupForm!.valid) {
        this.toastr.success('Registration successful! You can now log in.');
        this.router.navigate(['/login']);
    }
  }
}
