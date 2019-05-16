// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Rxjs
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

// Model
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiPath: string = 'api/categories';

  constructor(private http: HttpClient) {}

  // ======================================================================================
  // =================================== PUBLIC METHODS ===================================
  // ======================================================================================

  /**
   * Faz chamada ao back-end e retorna a lista com todos os registros
   * @returns Observable<Category[]>
   */
  getAll(): Observable<Category[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
    );
  }

  /**
   * Faz chama ao back-end e retorna um registro específico pelo ID informado
   * @param id: number
   * @returns Observable<Category>
   */
  getById(id: number): Observable<Category> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    );
  }

  /**
   * Envia ao back-end parâmetros para inserção de novo registro
   * @param category: Category
   * @returns Observable<Category>
   */
  create(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategory)
    );
  }

  /**
   * Envia ao back-end parâmetros para atualização de um registro
   * @param category
   * @returns Observable<Category>
   */
  update(category: Category): Observable<Category> {
    const url = `${this.apiPath}/${category.id}`;
    return this.http.put(url, category).pipe(
      catchError(this.handleError),
      map(() => category)
    );
  }

  /**
   * Envia ao back-end parâmetros para exclusão de um registro
   * @param id
   * @returns Observable<any>
   */
  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // =======================================================================================
  // =================================== PRIVATE METHODS ===================================
  // =======================================================================================

  /**
   * Recebe um json de any[] e retorna um array de categorias
   * @param jsonData: any[]
   * @returns Category[]
   */
  private jsonDataToCategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];
    jsonData.forEach(element => categories.push(element as Category));
    return categories;
  }

  /**
   * Recebe um json de any e retorna um objeto json do tipo Category
   * @param jsonData: any
   * @returns Category
   */
  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category;
  }

  /**
   * Recebe um erro de any e retorna um throwError de error
   * @param error: any
   * @returns Observable<any>
   */
  private handleError(error: any): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO: ', error);
    return throwError(error);
  }
}
