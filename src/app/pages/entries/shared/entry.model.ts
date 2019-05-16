// Model
import { Category } from '../../categories/shared/category.model';

export class Entry {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public type?: string,
    public amount?: string,
    public date?: string,
    public paid?: boolean,
    public categoryId?: number,
    public category?: Category
  ) {}

  /**
   * Tipos de entradas
   */
  static types = {
    expense: 'Despesa',
    renevue: 'Receita'
  };

  /**
   * Retorna o texto para o status da entrada
   * @returns void
   */
  get paidText(): string {
    return this.paid ? 'Pago' : 'Pendente';
  }
}
