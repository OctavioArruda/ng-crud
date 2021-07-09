import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from './product.model';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'http://localhost:3001/products';
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) {}

  showMessage(message: string): void {
    this.snackBar.open(message, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  readById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.baseUrl}/${product.id}`,
      product
    );
  }

  navigateToProductsPage(): void {
    this.router.navigate(['/products']);
  }
}
