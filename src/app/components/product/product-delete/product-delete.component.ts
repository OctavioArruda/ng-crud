import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css'],
})
export class ProductDeleteComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  product!: Product;
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService
        .readById(id)
        .subscribe(product => {
          this.product = product;
        });
    }
  }

  deleteProduct(): void {
    if (this.product.id) {
      this.productService
        .delete(this.product.id.toString())
        .subscribe(() => {
          this.productService.showMessage(
            'Product deleted with success'
          );
          this.productService.navigateToProductsPage();
        });

      return;
    }

    console.error('Fatal error');
  }

  cancel(): void {
    this.productService.navigateToProductsPage();
  }
}
