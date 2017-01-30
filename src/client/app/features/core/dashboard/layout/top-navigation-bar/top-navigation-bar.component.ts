/** Angular Dependencies */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'top-navigation-bar',
  templateUrl: 'top-navigation-bar.component.html',
  styleUrls: ['top-navigation-bar.component.css'],
})
export class TopNavigationBarComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
