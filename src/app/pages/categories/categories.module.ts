// Angular
import { NgModule } from '@angular/core';

// Route
import { CategoriesRoutingModule } from './categories-routing.module';

// Components
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';

// Modules
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [CategoryListComponent, CategoryFormComponent],
  imports: [SharedModule, CategoriesRoutingModule]
})
export class CategoriesModule {}
