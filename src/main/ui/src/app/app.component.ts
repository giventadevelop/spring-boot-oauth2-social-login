import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/css/stylesheet.css','../assets/css/form.css',
              '../assets/css/ui.css','../assets/css/colorbox.css']
})
export class AppComponent /*implements OnInit*/ {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  private logoutPathParam: string;

  constructor(private router: ActivatedRoute,private tokenStorageService: TokenStorageService) {}

  /*ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.logoutPathParam = this.router.snapshot.queryParamMap.get('logout');
    console.log('in  WebHomeComponent ngOnInit logoutPathParam ', this.logoutPathParam);
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      if (user.displayName) {
        this.username = user.displayName;
      } else {
        this.username = user.email;
      }
    }
    //this.router.navigateByUrl('/web-home');
  }*/

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
