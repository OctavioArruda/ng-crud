import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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

  showMessage(
    message: string,
    isError: boolean = false
  ): void {
    this.snackBar.open(message, 'x', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError
        ? ['error-message']
        : ['success-message'],
    });
  }

  create(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.baseUrl, product)
      .pipe(
        map(obj => obj),
        catchError(err => this.errorHandler(err))
      );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('An error has ocurred', true);
    return EMPTY;
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(err => this.errorHandler(err))
    );
  }

  readById(id: string): Observable<Product> {
    return this.http
      .get<Product>(`${this.baseUrl}/${id}`)
      .pipe(
        map(obj => obj),
        catchError(err => this.errorHandler(err))
      );
  }

  update(product: Product): Observable<Product> {
    return this.http
      .put<Product>(
        `${this.baseUrl}/${product.id}`,
        product
      )
      .pipe(
        map(obj => obj),
        catchError(err => this.errorHandler(err))
      );
  }

  delete(id: string): Observable<Product> {
    return this.http
      .delete<Product>(`${this.baseUrl}/${id}`)
      .pipe(
        map(obj => obj),
        catchError(err => this.errorHandler(err))
      );
  }

  navigateToProductsPage(): void {
    this.router.navigate(['/products']);
  }
}
