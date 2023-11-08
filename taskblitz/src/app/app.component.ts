import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private authService: AuthService) {}
  isLoggedIn: boolean = false;
  private authStatusSubscription!: Subscription;

  ngOnInit() {
    this.authStatusSubscription  = this.authService.getIsLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy() {
    // Unsubscribe from the observable to avoid memory leaks
    this.authStatusSubscription.unsubscribe();
  }
}
