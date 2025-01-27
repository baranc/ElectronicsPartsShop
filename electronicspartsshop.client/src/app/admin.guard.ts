import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    const userJson = sessionStorage.getItem('currentUser');
    return this.authService.getUserRoles(userJson).pipe(
      map((roles) => {
        if (roles.includes('Admin')) {
          return true;
        } else {
          this.router.navigate(['/home']); 
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']); 
        return [false];
      })
    );
  }
}
