import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
export class UiDropDownLoaderService {

  constructor(
    private http: HttpClient,
  ) {

  }

  getCountries(): Observable<any> {
    const isProd = environment.production;
    return this.http.get(
      environment.AUTH_API + 'country',
      httpOptions
    );
  }

  getAddressTypes(): Observable<any> {
    const isProd = environment.production;
    return this.http.get(
      environment.AUTH_API + 'address_type',
      httpOptions
    );
  }

  getPhoneContactTypes(): Observable<any> {
    const isProd = environment.production;
    return this.http.get(
      environment.AUTH_API + 'phone_contact_type',
      httpOptions
    );
  }
}
