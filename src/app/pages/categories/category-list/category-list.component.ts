import { element } from 'protractor';
// Angular
import { Component, OnInit } from '@angular/core';

// Model
import { Category } from './../shared/category.model';

// Service
import { CategoryService } from './../shared/category.service';

// FontAwesome
import { faPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  // FontAwesome
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.onGetAll();
  }

  /**
   * Carrega todos os registros
   * @returns void
   */
  onGetAll(): void {
    this.categoryService.getAll().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (err: Error) => {
        console.error('Erro: ', err.message);
      }
    );
  }

  /**
   * Exclui um registro
   * @param category: Category
   * @returns void
   */
  onDelete(category: Category): void {
    const shouldDelete = confirm('Deseja realmente excluir este registro?');

    if (shouldDelete) {
      this.categoryService.delete(category.id).subscribe(
        () => {
          this.categories = this.categories.filter(element => element != category);
          console.log('Sucesso');
        },
        (err: Error) => {
          console.error('Erro: ', err.message);
        }
      );
    }
  }
}
