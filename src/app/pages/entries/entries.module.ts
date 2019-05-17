// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Route
import { EntriesRoutingModule } from './entries-routing.module';

// Others
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [CommonModule, EntriesRoutingModule, FontAwesomeModule, ReactiveFormsModule]
})
export class EntriesModule {}
