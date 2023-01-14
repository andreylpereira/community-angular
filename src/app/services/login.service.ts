import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Login from '../../app/models/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import CurrentUser from 'src/app/models/currentUser.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  readonly url: string;

  private currentUser: CurrentUser = {
    id: 0,
    sub: '',
    name: '',
    // exp: 0,
    // iat: 0,
    // permissions: [],
    token: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    this.url = 'http://localhost:8888/api/auth/login';
  }

  login(user: Login) {

    return this.http.post<any>(this.url, user).subscribe((data) => {
      const payload = this.jwtHelper.decodeToken(data.acessToken);
      this.currentUser.id = payload.id
      this.currentUser.sub = payload.sub
      this.currentUser.name = payload.name
      // this.currentUser.exp = payload.exp
      // this.currentUser.iat = payload.iat
      // this.currentUser.permissions = payload.permissions
      this.currentUser.token = `Bearer ${data.acessToken}`

      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.router.navigate(['/control-panel/informations']);
    });
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }


  getUser() {
    const session: any = localStorage.getItem('currentUser');
    const data = JSON.parse(session);
    if (data !== null) {
      this.currentUser.id = data.id;

      this.currentUser.token = data.token;
      return this.currentUser;
    } else {
      return null;
    }
  }

}
