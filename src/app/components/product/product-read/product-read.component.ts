import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css'],
})
export class ProductReadComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'action',
  ];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products;
    });
  }

  deleteProduct(id: string): void {
    if (id) {
      this.productService.delete(id).subscribe(() => {
        this.productService.showMessage(
          'Product deleted with success'
        );
        this.productService.navigateToProductsPage();
      });

      return;
    }

    console.error('Fatal error');
  }
}
