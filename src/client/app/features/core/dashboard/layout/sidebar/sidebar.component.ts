import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../shared/services/login.service';
import { Component } from '@angular/core';
declare var $: any;

/** Component Definition */
@Component({
  moduleId: module.id,
  selector: 'sidebar-menu',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
})
export class SidebarComponent {
  isUserMenuOpen: boolean;
  constructor(private loginService: LoginService, private router: Router) {
    this.isUserMenuOpen = false;
  }

  logout() {
    this.loginService.logout();
    this.isUserMenuOpen = false;
    this.router.navigate(['/login']);
  }

  toggleUserMenu() {
    if (this.isUserMenuOpen) {
      $('.user-menu').slideUp();
    } else {
      $('.user-menu').slideDown();
    }
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
}
