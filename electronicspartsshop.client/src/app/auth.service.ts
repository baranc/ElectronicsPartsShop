import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7054/api';
  constructor(private http: HttpClient) { }

  getCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
  getUserRoles(username: string | null): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/roles/${username}`);
  }
}
