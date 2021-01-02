import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../common/app.constants';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials): Observable<any> {
    const isProd = environment.production;
    return this.http.post(
      environment.AUTH_API + 'signin',
      {
        email: credentials.username,
        password: credentials.password,
      },
      httpOptions
    );
  }

  register(user): Observable<any> {
    return this.http.post(
      environment.AUTH_API + 'signup',
      {
        displayName: user.displayName,
        email: user.email,
        password: user.password,
        matchingPassword: user.matchingPassword,
        socialProvider: 'LOCAL',
      },
      httpOptions
    );
  }
}
