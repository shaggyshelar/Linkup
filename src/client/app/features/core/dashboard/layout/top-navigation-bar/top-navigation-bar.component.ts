import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../shared/services/login.service';
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'top-navigation-bar',
  templateUrl: 'top-navigation-bar.component.html',
  styleUrls: ['top-navigation-bar.component.css'],
})
export class TopNavigationBarComponent {

  constructor(private loginService: LoginService, private router: Router) {
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
