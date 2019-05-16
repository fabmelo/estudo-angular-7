// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Route
import { CategoriesRoutingModule } from './categories-routing.module';

// Others
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';

@NgModule({
  declarations: [CategoryListComponent, CategoryFormComponent],
  imports: [CommonModule, CategoriesRoutingModule, FontAwesomeModule, ReactiveFormsModule]
})
export class CategoriesModule {}
