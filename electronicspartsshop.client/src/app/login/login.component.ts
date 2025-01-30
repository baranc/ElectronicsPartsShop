import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AccountService } from '../services/accountService';

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

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private accountService: AccountService) { }

  login() {
    this.accountService.login({ username: this.username, password: this.password })
      .subscribe(next => {
        console.log('Logged in successfully');
        this.accountService.getUserInfo().subscribe();
        this.router.navigate(['home']);
      }, error => {
        console.log('Login failed', error);
      });
  }
}
