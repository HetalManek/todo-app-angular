import { Component } from '@angular/core';
import { Router } from '@angular/router';

// ** mui imports

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title = 'TaskBlitz';

  constructor(private router: Router) {}

  redirectToLogin() {
    this.router.navigate(['/login']); // Navigate to the login page
  }

  redirectToSignUp() {
    this.router.navigate(['/signup']); // Navigate to the sign up page
  }
}
