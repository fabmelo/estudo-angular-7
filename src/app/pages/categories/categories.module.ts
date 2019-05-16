// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { CategoriesRoutingModule } from './categories-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';

@NgModule({
  declarations: [CategoryListComponent, CategoryFormComponent],
  imports: [CommonModule, CategoriesRoutingModule, FontAwesomeModule]
})
export class CategoriesModule {}
