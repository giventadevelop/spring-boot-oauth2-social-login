import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  editProfile: boolean = false;
  currentUser: any;
  userOj: any = {};
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private token: TokenStorageService,private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log('this.currentUser', this.currentUser);
    this.form = this.currentUser;
  }

  onEditProfile(): void {
   // this.editProfile = true;
    this.router.navigateByUrl('/register');

  }

  onRefreshToken() {
    this.authService.refreshToken().subscribe(
      (refreshTknResponse) => {
        console.log(refreshTknResponse);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err) => {
        this.errorMessage = err.error.message;
        console.log(
          'refreshTknResponse error in prfl cmpnt :- ',
          this.errorMessage
        );
        // this.isSignUpFailed = true;
      }
    );
  }
  onSubmit(): void {
    // this.userOj = this.token.getUser();
    this.userOj.providerUserId = this.form.email;
    this.userOj.email = this.form.email;
    this.userOj.password = this.form.password;
    this.userOj.roles = this.currentUser.roles;
    this.userOj.provider = null;
    this.userOj.createdDate = null;
    this.userOj.modifiedDate = null;
    this.userOj.provider = null;
    this.userOj.enabled = true;
    this.userOj.id = this.currentUser.id;
    this.userOj.displayName = null;

    /*   private String email;
    private boolean enabled;
    private String displayName;
    private String password; */

    this.userService.upDateUserProfile(this.userOj).subscribe(
      (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      (err) => {
        this.errorMessage = err.error.message;
        console.log('user update profile error :- ', this.errorMessage);
        this.isSignUpFailed = true;
      }
    );
  }
}
