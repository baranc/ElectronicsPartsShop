import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatBadge } from '@angular/material/badge';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/accountService';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [MatIcon, MatButton, MatBadge, RouterOutlet, RouterModule, FormsModule, CommonModule]
})
export class HeaderComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('currentUser');
  }
  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.accountService.currentUser.set(null);
        this.router.navigate(['home']);
      }
    })
  }
}
