// Service
import { InMemoryDbService } from 'angular-in-memory-web-api';

// Model
import { Category } from './pages/categories/shared/category.model';
import { Entry } from './pages/entries/shared/entry.model';

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

    const entries: Entry[] = [
      {
        id: 1,
        name: 'Gás de Cozinha',
        description: 'Compra de botijão de gás para cozinha',
        type: 'expense',
        amount: 78.56,
        date: '25/04/2019',
        paid: false,
        categoryId: categories[0].id,
        category: categories[0]
      } as Entry,
      {
        id: 2,
        name: 'Aluguel',
        description: 'Pagamento do aluguel do mês',
        type: 'expense',
        amount: 1575.89,
        date: '03/04/2019',
        paid: true,
        categoryId: categories[1].id,
        category: categories[1]
      } as Entry,
      {
        id: 3,
        name: 'Cinema',
        description: 'Passeio no cinema filme dos Vingadores',
        type: 'expense',
        amount: 99.78,
        date: '09/04/2019',
        paid: false,
        categoryId: categories[2].id,
        category: categories[2]
      } as Entry,
      {
        id: 4,
        name: 'Academia',
        description: 'Mensalidade da academia',
        type: 'expense',
        amount: 66.56,
        date: '16/04/2019',
        paid: true,
        categoryId: categories[3].id,
        category: categories[3]
      } as Entry,
      {
        id: 5,
        name: 'Salário',
        description: 'Salário do mês',
        type: 'revenue',
        amount: 7000.0,
        date: '10/05/2019',
        paid: true,
        categoryId: categories[5].id,
        category: categories[5]
      } as Entry
    ];

    return { categories, entries };
  }
}
