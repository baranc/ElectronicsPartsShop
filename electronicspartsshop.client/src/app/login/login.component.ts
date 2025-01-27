import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule]
})
export class LoginComponent {
  private apiUrl = 'https://localhost:7054';
  username: string = '';
  password: string = '';
  roles: string[] = [];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  login() {
    this.http.post(this.apiUrl + '/login', { email: this.username, password: this.password })
      .subscribe(response => {
        console.log('Logged in successfully', response);
        //this.authService.getUserRoles
        sessionStorage.setItem('currentUser', JSON.stringify(this.username));
        this.router.navigate(['home']);
      }, error => {
        console.log('Login failed', error);
      });

    //this.http.get<string[]>(`${this.apiUrl}/roles/${this.username}`).subscribe(
    //  (roles: string[]) => {
    //    this.roles = roles;
    //    if (!roles.includes('Admin')) {
    //      console.error('Access denied - Admins only');
    //    }
    //  },
    //  (error) => {
    //    console.error('Failed to fetch user roles:', error);
    //  }
    //);
  }
}
