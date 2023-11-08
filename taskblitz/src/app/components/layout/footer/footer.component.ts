import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private authService: AuthService) {}
  isLoggedIn: boolean = false;
  private authStatusSubscription!: Subscription;

  ngOnInit() {
    this.authStatusSubscription = this.authService
      .getIsLoggedIn()
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  ngOnDestroy() {
    // Unsubscribe from the observable to avoid memory leaks
    this.authStatusSubscription.unsubscribe();
  }
}
