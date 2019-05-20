/**
 * No módulo de CORE:
 * Components, Services, Guards itens OBRIGATÓRIOS para o funcionamento do sistema
 * Os itens devem ser importados ou declarados, mas pode se esquecer de exportar
 * para que esteja disponível para quem importar, neste caso do Core Module,
 * quem importa é o App Module.
 */

// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Database Mock
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memory-database';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)
  ],
  exports: [BrowserModule, BrowserAnimationsModule, HttpClientModule]
})
export class CoreModule {}
