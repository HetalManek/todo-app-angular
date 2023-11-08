import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
  private authStatusSubscription!: Subscription;
  isLoggedIn: boolean = false;

  ngOnInit() {
    this.authStatusSubscription = this.authService
      .getIsLoggedIn()
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  redirectToHomePage() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    // Unsubscribe from the observable to avoid memory leaks
    if (this.authStatusSubscription) {
      this.authStatusSubscription.unsubscribe();
    }
  }
}
