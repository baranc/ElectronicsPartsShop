import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule]
})
export class LoginComponent {
  private apiUrl = 'https://localhost:7054/api/account';
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    this.http.post(this.apiUrl + '/login', { username: this.username, password: this.password })
      .subscribe(response => {
        console.log('Logged in successfully', response);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['home']);
      }, error => {
        console.log('Login failed', error);
      });
  }
}
