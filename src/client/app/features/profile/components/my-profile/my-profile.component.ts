/** Angular Dependencies */
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

/** Module Level Dependencies */

/** Component Declaration */
@Component({
  moduleId: module.id,
  selector: 'my-profile',
  templateUrl: 'my-profile.component.html',
  styleUrls: ['my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  isEdit: boolean;
  profileInfo: any;
  src: any;

  constructor(
    private router: Router) {
    this.isEdit = false;
    this.profileInfo = {};
  }

  ngOnInit(): void {
    this.profileInfo = this.getCurrentUser();
    if (this.profileInfo.ProfilePictureName) {
      this.src = 'http://192.168.100.153:202/Profile%20Picture%20Library/' + this.profileInfo.ProfilePictureName + '.JPG';
    } else {
      this.src = '../assets/images/default-user.jpg';
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('loggedInUserDetails'));
  }

  edit() {
    this.isEdit = true;
  }
  upload() {
    this.isEdit = false;
  }
  cancel() {
    this.isEdit = false;
  }
}
