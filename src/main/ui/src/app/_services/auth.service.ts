import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { tap, catchError, switchMap, take, filter } from 'rxjs/operators';
import { AppConstants } from '../common/app.constants';
import { environment } from '../../environments/environment';
import { TokenStorageService } from '../_services/token-storage.service';
import { RefreshTokenPayload } from '../login/RefreshTokenPayload';
import { RefreshTokenPayloadIntfc } from '../login/RefreshTokenPayloadIntfc';

import { JwtAuthenticationResponse } from '../login/JwtAuthenticationResponse';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  refreshTokenPayload = {} as RefreshTokenPayload;
  // refreshTokenPayload: RefreshTokenPayload;
  refreshTokenPayloadIntfc: RefreshTokenPayloadIntfc;
  private refreshTokenTimeout;

  private loginLogoutMessage = new BehaviorSubject('home');
  currentloginLogoutMessage = this.loginLogoutMessage.asObservable();

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
    // this.refreshTokenPayload = this.tokenStorageService.getRefreshTokenPayload();
  }

  login(credentials): Observable<any> {
    const isProd = environment.production;
    return this.http.post(
      environment.AUTH_API + 'signin',
      {
        email: credentials.username,
        password: credentials.password,
      },
      httpOptions
    ).pipe(
      tap((response) => {
        this.tokenStorageService.saveTokens(response);
        this.startRefreshTokenTimer();
      })
    );
  }

  register(user): Observable<any> {
    let url= environment.AUTH_API + 'signup';
    console.log('register/signup url ',url) ;
    return this.http.post(
      environment.AUTH_API + 'signup',
      user,
      httpOptions
    );
  }

  /**
   * refresh token set up based on the below article
   * https://jasonwatmore.com/post/2020/05/22/angular-9-jwt-authentication-with-refresh-tokens
   * @private
   */
  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    // const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

    const jwtTokenStr = this.tokenStorageService.getToken();
    const jwtToken = JSON.parse(atob(jwtTokenStr.split('.')[1]));
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;

     this.refreshTokenTimeout = setTimeout(() => {
      this.refreshToken().subscribe();
    }, timeout);
  }

  public refreshToken() {
    var refreshTokenUrl = environment.AUTH_API + 'refresh/token';
    this.refreshTokenPayload = this.tokenStorageService.getRefreshTokenPayload();
    console.log('refreshTokenPayload', this.refreshTokenPayload);
    return this.http.post<any>(refreshTokenUrl, this.refreshTokenPayload).pipe(
      tap(
        (jwtAuthenticationResponse: JwtAuthenticationResponse) => {
          console.log(
            'jwtAuthenticationResponse in refreshToken Auth Service ',
            jwtAuthenticationResponse
          );
          this.tokenStorageService.saveTokens(jwtAuthenticationResponse);
          this.startRefreshTokenTimer();
        },

        catchError((error) => {
          console.log('Handling error locally and rethrowing it...', error);
          return throwError(error);
        })
      )
    );
  }

  /**
   * To update the whether its Login or Logout link on the header
   * @param loginLogoutMessageIn
   */
  updateLoginLogoutMessage(loginLogoutMessageIn: string) {
    this.loginLogoutMessage.next(loginLogoutMessageIn);
    console.log('currentloginLogoutMessage  in authService',this.currentloginLogoutMessage);
  }
}
