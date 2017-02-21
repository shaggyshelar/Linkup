/** Angular Dependencies */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  moduleId: module.id,
  selector: 'top-navigation-bar',
  templateUrl: 'top-navigation-bar.component.html',
  styleUrls: ['top-navigation-bar.component.css'],
})
export class TopNavigationBarComponent implements OnInit  {
  userDetail:any;
  profileImageSrc:any;
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
   this.userDetail=this.authService.getCurrentUser();
    if (this.userDetail.ProfilePictureName) {
      this.profileImageSrc = 'http://192.168.100.153:202/Profile%20Picture%20Library/' + this.userDetail.ProfilePictureName + '.JPG';
    } else {
      this.profileImageSrc = '../assets/images/default-user.jpg';
    }
  }

  logout() {
     this.authService.logout();
     this.router.navigate(['/login']);
  }
}
