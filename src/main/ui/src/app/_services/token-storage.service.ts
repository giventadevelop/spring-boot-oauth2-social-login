import { Injectable } from '@angular/core';
import { RefreshTokenPayload } from '../login/RefreshTokenPayload';
import { RefreshTokenPayloadIntfc } from '../login/RefreshTokenPayloadIntfc';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_ID = 'user_id';
const USER_EMAIL = 'user_email';
const REFRESH_TOKEN = 'refersh_token';
const TOKEN_EXPIRY_TIME = 'token_expiry_time';
const USER_LOGGED_OUT = 'user_logged_out';
const USER_LOGGED_IN = 'user_logged_in';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  refreshTokenPayload = {} as RefreshTokenPayload;
  refreshTokenPayloadIntfc = {} as RefreshTokenPayloadIntfc;
  constructor() {}

  signOut(): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
    window.sessionStorage.setItem(USER_LOGGED_OUT, USER_LOGGED_OUT);
  }

  public userLoggedIn(): void {
    //window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(USER_LOGGED_IN, USER_LOGGED_IN);
  }

  public getUserLoggedIn(): string {
    console.log('USER_LOGGED_IN',window.sessionStorage.getItem(USER_LOGGED_IN));
    return window.sessionStorage.getItem(USER_LOGGED_IN);
  }

  public clearUserLoggedIn(){
    window.sessionStorage.removeItem(USER_LOGGED_IN);
    window.sessionStorage.removeItem(USER_LOGGED_IN);
  }
  public userLoggedOut(): void {
    //window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(USER_LOGGED_OUT, USER_LOGGED_OUT);
  }

  public getUserLoggedOut(): string {
    return window.sessionStorage.getItem(USER_LOGGED_OUT);
  }

  public clearUserLoggedOut(){
    window.sessionStorage.removeItem(USER_LOGGED_OUT);
    window.sessionStorage.removeItem(USER_LOGGED_OUT);
  }



  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveTokens(data: any): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, data.accessToken);
    window.sessionStorage.removeItem(REFRESH_TOKEN);
    window.sessionStorage.setItem(REFRESH_TOKEN, data.refreshToken);
    window.sessionStorage.removeItem(TOKEN_EXPIRY_TIME);
    window.sessionStorage.setItem(TOKEN_EXPIRY_TIME, data.expiresAt);
    window.sessionStorage.removeItem(USER_LOGGED_OUT);
    window.sessionStorage.setItem(USER_LOGGED_IN, USER_LOGGED_IN);
    window.sessionStorage.setItem(USER_LOGGED_IN, USER_LOGGED_IN);
    window.sessionStorage.removeItem(USER_LOGGED_OUT);
    this.saveUser(data.user);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, user.id);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.sessionStorage.removeItem(USER_EMAIL);
    var userEmail = user.email;
    window.sessionStorage.setItem(USER_EMAIL, userEmail);
  }

  public getUser(): any {
    return JSON.parse(window.sessionStorage.getItem(USER_KEY));
  }

  public getRefreshTokenPayload(): RefreshTokenPayload {
    this.refreshTokenPayload.email = window.sessionStorage.getItem(USER_EMAIL);
    this.refreshTokenPayload.userId = window.sessionStorage.getItem(USER_ID);
    this.refreshTokenPayload.jwtToken = window.sessionStorage.getItem(
      TOKEN_KEY
    );
    this.refreshTokenPayload.password = 'test';
    this.refreshTokenPayload.refreshToken = window.sessionStorage.getItem(
      REFRESH_TOKEN
    );
    return this.refreshTokenPayload;
  }

  public getRefreshTokenPayloadIntrfc(): RefreshTokenPayload {
    this.refreshTokenPayload.email = window.sessionStorage.getItem(USER_EMAIL);
    this.refreshTokenPayload.jwtToken = window.sessionStorage.getItem(
      TOKEN_KEY
    );
    this.refreshTokenPayload.password = 'test';
    this.refreshTokenPayload.refreshToken = window.sessionStorage.getItem(
      REFRESH_TOKEN
    );
    return this.refreshTokenPayload;
  }
}
