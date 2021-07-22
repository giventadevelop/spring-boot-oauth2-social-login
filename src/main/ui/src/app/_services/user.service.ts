import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../common/app.constants';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(environment.API_URL + 'all', {
      responseType: 'text',
    });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(environment.API_URL + 'user', {
      responseType: 'text',
    });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(environment.API_URL + 'mod', {
      responseType: 'text',
    });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(environment.API_URL + 'admin', {
      responseType: 'text',
    });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(environment.API_URL + 'user/me', httpOptions);
  }

  /**
   * to update an user profile
   * by passing user id as a path parameter
   * like user/userid
   * get the userDTO details
   * @param userId
   */
  getUserById(userId: number): Observable<any> {
    return this.http.get(environment.API_URL + 'user/'+userId, httpOptions,);
   /* let userByIdPath=environment.API_URL + 'user/${userId}';
    return this.http.get(userByIdPath, httpOptions);*/
   // return this.http.get(environment.API_URL + 'user/${userId}', httpOptions);
  }

  upDateUserProfile(user): Observable<any> {
    console.log(
      ' environment.API_URL + user    ',
      environment.API_URL + 'user'
    );
    console.log(JSON.stringify(user));
    return this.http.post(environment.API_URL + 'user', user, httpOptions);
  }

  deleteUserPhone(phoneId): Observable<any> {
    //let url='${environment.API_URL} + ${phoneId}';
    let url=environment.API_URL +'phone/'+phoneId;
   // return this.http.delete('$environment.API_URL + ${phoneId}', httpOptions);
    return this.http.delete(url, httpOptions);
    //return this.http.post(environment.API_URL + 'phone', phone, httpOptions);
  }
}
