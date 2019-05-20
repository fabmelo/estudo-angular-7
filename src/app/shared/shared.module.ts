/**
 * No módulo de SHARED:
 * Components, Services, Models, Directives. Pipes itens NÃO OBRIGATÓRIOS para o funcionamento do sistema
 * Os itens devem ser importados ou declarados, mas pode se esquecer de exportar
 * para que esteja disponível para quem importar o Shared Module, ao contrário do Core Module, quem importa
 * não será o App Module, mas sim os módulos secundários.
 */

// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Others
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, CalendarModule, IMaskModule],
  exports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, CalendarModule, IMaskModule]
})
export class SharedModule {}
