/** Angular Dependencies */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/auth.service';
declare var $: any;

/** Component Definition */
@Component({
  moduleId: module.id,
  selector: 'sidebar-menu',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
})
export class SidebarComponent implements OnInit  {
  isUserMenuOpen: boolean;
  userDetail:any;
  constructor(private authService: AuthService, private router: Router) {
    this.isUserMenuOpen = false;
  }
  ngOnInit(): void {
   this.userDetail=this.authService.getCurrentUser();
  }
  logout() {
    this.authService.logout();
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
