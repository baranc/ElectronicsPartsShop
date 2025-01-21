import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class AdminPanelComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { id: 0, name: '', description: '', price: 0, imagePath: '' };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => (this.products = data));
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe(() => {
      this.loadProducts();
      this.newProduct = { id: 0, name: '', description: '', price: 0, imagePath: '' };
    });
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe(() => this.loadProducts());
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }
}
