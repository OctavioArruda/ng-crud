import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  product!: Product;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService
        .readById(id)
        .subscribe(product => {
          this.product = product;
        });
      return;
    }

    console.error('Product was not found');
  }

  updateProduct(): void {
    this.productService
      .update(this.product)
      .subscribe(() => {
        this.productService.showMessage(
          'Product edited with success'
        );
        this.productService.navigateToProductsPage();
      });
  }

  cancel(): void {
    this.productService.navigateToProductsPage();
  }
}
