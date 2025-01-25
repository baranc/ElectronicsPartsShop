import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../product.service';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  imports: [CurrencyPipe, CommonModule, ProductItemComponent, RouterLink]
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  cart: Product[] = []; // Koszyk zakupowy

  constructor(private productService: ProductService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addToCart(product: Product): void {
    this.cart.push(product);
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }
  goToPayment(): void {
    const totalAmount = this.getTotalPrice();
    localStorage.setItem('totalAmount', totalAmount.toString());
    this.router.navigate(['cashRegister']);
  }
}
