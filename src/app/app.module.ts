// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

// Components
import { AppComponent } from './app.component';

// Database Mock
import { InMemoryDatabase } from './in-memory-database';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    InMemoryDatabase
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
