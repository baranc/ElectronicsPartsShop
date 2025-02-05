import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { map, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);
  isAdmin = computed(() => {
    const roles = this.currentUser()?.roles;
    return Array.isArray(roles) ? roles.includes('Admin') : roles === 'Admin';
  });

  login(values: any) {
    let params = new HttpParams();
    params = params.append('useCookies', true);
    return this.http.post<User>(this.baseUrl + 'api/account/login', values, { params, withCredentials:true })
  }

  register(values: any) {
    return this.http.post(this.baseUrl + 'register', values);
  }

  getUserInfo() {
    return this.http.get<User>(this.baseUrl + 'api/account/user-info', { withCredentials: true }).pipe(
      map(user => {
        this.currentUser.set(user);
        return user;
      })
    )
  }

  logout() {
    sessionStorage.setItem('currentUser', '');
    return this.http.get(this.baseUrl + 'api/account/logout',{ withCredentials:true })
  }

  getAuthState() {
    return this.http.get<{ isAuthenticated: boolean }>(this.baseUrl + 'account/auth-status');
  }
}
