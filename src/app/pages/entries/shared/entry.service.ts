// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Rxjs
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

// Model
import { Entry } from './entry.model';

// Others
import toastr from 'toastr';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private apiPath: string = 'api/entries';

  constructor(private http: HttpClient) {}

  // ======================================================================================
  // =================================== PUBLIC METHODS ===================================
  // ======================================================================================

  /**
   * Faz chamada ao back-end e retorna a lista com todos os registros
   * @returns Observable<Entry[]>
   */
  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    );
  }

  /**
   * Faz chama ao back-end e retorna um registro específico pelo ID informado
   * @param id: number
   * @returns Observable<Entry>
   */
  getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    );
  }

  /**
   * Envia ao back-end parâmetros para inserção de novo registro
   * @param entry: Entry
   * @returns Observable<Entry>
   */
  create(entry: Entry): Observable<Entry> {
    return this.http.post(this.apiPath, entry).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    );
  }

  /**
   * Envia ao back-end parâmetros para atualização de um registro
   * @param entry: Entry
   * @returns Observable<Entry>
   */
  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;
    return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      map(() => entry)
    );
  }

  /**
   * Envia ao back-end parâmetros para exclusão de um registro
   * @param id: number
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
   * Recebe um json de any[] e retorna um array de entradas
   * @param jsonData: any[]
   * @returns Entry[]
   */
  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach(element => entries.push(Object.assign(new Entry(), element)));
    return entries;
  }

  /**
   * Recebe um json de any e retorna um objeto json do tipo Entry
   * @param jsonData: any
   * @returns Entry
   */
  private jsonDataToEntry(jsonData: any): Entry {
    return Object.assign(new Entry(), jsonData);
  }

  /**
   * Recebe um erro de any e retorna um throwError de error
   * @param error: any
   * @returns Observable<any>
   */
  private handleError(error: any): Observable<any> {
    toastr.error(`Erro na Requisição: ${error}`);
    return throwError(error);
  }
}
