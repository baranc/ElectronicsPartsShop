import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; 
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private apiUrl = environment.apiUrl + 'api/account/';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  async canActivate(): Promise<boolean> {
    const user = this.authService.getCurrentUser();
    const link = `${this.apiUrl}/roles/${user}`;
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
