// Service
import { InMemoryDbService } from 'angular-in-memory-web-api';

// Model
import { Category } from './pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories: Category[] = [
      { id: 1, name: 'Lazer', description: 'Mensalidade do Clube' },
      { id: 2, name: 'Saúde', description: 'Mensalidade do Plano de Saúde' },
      { id: 3, name: 'Educação', description: 'Mensalidade da Faculdade' },
      { id: 4, name: 'Transporte', description: 'Combustível' },
      { id: 5, name: 'Alimentação', description: 'Supermercado' },
      { id: 6, name: 'Salário', description: 'Salário do Mês de Abril' }
    ];

    return { categories };
  }
}
