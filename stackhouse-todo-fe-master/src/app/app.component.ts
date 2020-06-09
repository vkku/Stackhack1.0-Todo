import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.servcie';
import {UserSignIn} from './models/usersignin.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  currentUser: UserSignIn;
  searchText = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x),
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/signin']);
  }

  submitSearch() {
    if (this.searchText.trim().length > 0)
      this.router.navigate(['/search', this.searchText]);
    this.searchText = '';
  }
}
