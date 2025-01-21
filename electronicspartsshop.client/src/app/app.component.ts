import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from './product.service';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    { provide: LOCALE_ID, useValue: 'pl-PL' }
  ],
  styleUrls: ['./app.component.css'],
  imports: [CurrencyPipe, CommonModule, RouterModule]
})
export class AppComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }
}
