import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    name: 'Test',
    price: 125.12,
  };
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  createProduct(): void {
    this.productService
      .create(this.product)
      .subscribe(() => {
        this.productService.showMessage('Product saved');
        this.productService.navigateToProductsPage();
      });
  }

  cancel(): void {
    this.productService.showMessage('Product canceled');
    this.productService.navigateToProductsPage();
  }
}
