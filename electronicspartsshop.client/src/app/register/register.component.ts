import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule]
})
export class RegisterComponent {
  private apiUrl = environment.apiUrl;
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  register() {
    this.http.post(this.apiUrl + 'register', { email: this.username, password: this.password })
      .subscribe(response => {
        console.log('Registered successfully', response);
        this.router.navigate(['login']);
      }, error => {
        console.log('Registration failed', error);
      });
  }
}
