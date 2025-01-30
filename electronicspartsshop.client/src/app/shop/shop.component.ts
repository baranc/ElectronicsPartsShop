import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../product.service';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  imports: [CurrencyPipe, CommonModule, RouterLink]
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  cart: Product[] = [];

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
    sessionStorage.setItem('totalAmount', totalAmount.toString());

    const cartItems = this.cart.map(product => ({
      productId: product.id,
      quantity: 1 
    }));
    
    this.http.post('https://localhost:7054/api/cart/checkout', cartItems, { withCredentials: true })
      .subscribe(
        response => {
          console.log('Purchase successful', response);
          this.cart = [];
          this.router.navigate(['checkout']);
        },
        error => {
          console.log('Error during checkout', error);
        }
      );
  }

}
