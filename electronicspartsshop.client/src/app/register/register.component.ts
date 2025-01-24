import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule]
})
export class RegisterComponent {
  private apiUrl = 'https://localhost:7054/api/account';
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  register() {
    this.http.post(this.apiUrl + '/register', { username: this.username, password: this.password })
      .subscribe(response => {
        console.log('Registered successfully', response);
        this.router.navigate(['login']);
      }, error => {
        console.log('Registration failed', error);
      });
  }
}
