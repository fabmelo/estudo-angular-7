// Angular
import { NgModule } from '@angular/core';

// Route
import { EntriesRoutingModule } from './entries-routing.module';

// Components
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

// Modules
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    SharedModule,
    EntriesRoutingModule
  ]
})
export class EntriesModule {}
