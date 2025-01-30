import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cash-register',
  standalone: true,
  
  templateUrl: './cash-register.component.html',
  styleUrl: './cash-register.component.css',
  imports: [CurrencyPipe]
})
export class CashRegisterComponent {
  totalAmount = sessionStorage.getItem('totalAmount');
}
