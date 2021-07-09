import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.css','../../../assets/css/stylesheet.css', '../../../assets/css/form.css',
    '../../../assets/css/ui.css', '../../../assets/css/colorbox.css']
})
export class WebHeaderComponent implements OnInit {

  isUserLoggedIn :boolean = false;
  constructor(private router: Router,private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isUserLoggedIn  = true;
    }
  }

  logout(): void {

    this.isUserLoggedIn  = false;
   // this.router.navigateByUrl('/logout');
   // this.router.navigateByUrl('/web-home/logout');
   // this.router.navigateByUrl('/web-home', { queryParams: { logout: true } });
   // this.router.navigate(['/web-home'], { queryParams: { logout: true } });
    this.tokenStorageService.userLoggedOut();
    let isLoggingOut = this.tokenStorageService.getUserLoggedOut();
    console.log('isLoggingOut in header', isLoggingOut);
    //this.tokenStorageService.signOut();
   // this.router.navigate(['/logout'], { queryParams: { logout: true } });
    this.router.navigate(['/web-home'], { queryParams: { logout: true } });

   // window.location.reload();
  }

}
