import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.css', '../../../assets/css/stylesheet.css', '../../../assets/css/form.css',
    '../../../assets/css/ui.css', '../../../assets/css/colorbox.css']
})
export class WebHeaderComponent implements OnInit {

  loginLogoutMessage: string;
  loginLogoutMessageSubscription: Subscription;
  isUserLoggedIn: boolean = false;

  constructor(private router: Router, private tokenStorageService: TokenStorageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isUserLoggedIn = false;
    /* if (this.tokenStorageService.getToken()) {
       this.isUserLoggedIn  = true;
     }*/
    this.loginLogoutMessageSubscription = this.authService.currentloginLogoutMessage.subscribe(loginLogoutMessageIn => this.loginLogoutMessageDisplay(loginLogoutMessageIn));
  }

  /**
   * Determine login/logout link display in the web-header
   * section component based on the Behaviour subject
   * @param loginLogoutMessageIn
   */
  loginLogoutMessageDisplay(loginLogoutMessageIn) {
    console.log('loginLogoutMessageIn  in web-header',loginLogoutMessageIn);
    if (loginLogoutMessageIn === 'isLoggedIn') {
      this.isUserLoggedIn = true;
    } else if (loginLogoutMessageIn === 'logout') {
      this.isUserLoggedIn = false;
    } else {

      if (this.tokenStorageService.getUserLoggedOut()) {
        this.isUserLoggedIn  = false;
      }else if(this.tokenStorageService.getUserLoggedIn()){
        this.isUserLoggedIn = true;
      }
    }
  }

  logout(): void {
    this.isUserLoggedIn = false;
    this.tokenStorageService.signOut();
    this.authService.updateLoginLogoutMessage('logout');
    /*the below will just reload the web-home component and not the whole page tand thus
    still able to show the logout message*/
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/web-home'], {queryParams: {logout: true}});

  }

  ngOnDestroy(): void {
    this.loginLogoutMessageSubscription.unsubscribe();
  }

}
