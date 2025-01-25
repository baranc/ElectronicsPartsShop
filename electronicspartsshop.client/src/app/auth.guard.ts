import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; 
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private apiUrl = 'https://localhost:7054/api';
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    const roles = this.authService.getUserRoles(user);

    const hasAdminRole = roles.subscribe(list => list.includes('Admin'))
    if (hasAdminRole) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
