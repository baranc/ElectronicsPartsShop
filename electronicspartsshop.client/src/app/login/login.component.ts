import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AccountService } from '../services/accountService';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule]
})
export class LoginComponent {
  private apiUrl = environment.apiUrl;
  username: string = '';
  password: string = '';
  roles: string[] = [];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private accountService: AccountService) { }

  login() {
    this.accountService.login({ username: this.username, password: this.password })
      .subscribe(next => {
        console.log('Logged in successfully');
        sessionStorage.setItem('currentUser', JSON.stringify(this.username));
        this.accountService.getUserInfo().subscribe;
        this.router.navigate(['home']);
      }, error => {
        console.log('Login failed', error);
      });

  }
}
