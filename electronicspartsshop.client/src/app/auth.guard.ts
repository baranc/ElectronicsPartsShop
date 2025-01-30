import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; 
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private apiUrl = 'https://localhost:7054/api/account';
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  async canActivate(): Promise<boolean> {
    const userJson = sessionStorage.getItem('currentUser');
    var username = userJson ? JSON.parse(userJson) : null;
    const link = `${this.apiUrl}/roles/${username}`;
    var promiseRoles = this.http.get<string[]>(link);
    try {
      const roles = await this.http.get<string[]>(link).toPromise();
      if (roles && roles.includes('Admin')) {
        return true; 
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }

    this.router.navigate(['/login']);
    return false;

  }
  
}
