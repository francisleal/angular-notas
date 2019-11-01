import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AnotacoesRoutingModule } from './anotacoes.routing.module';
import { AnotacoesComponent } from './anotacoes.component';
import { FilterPipe } from '../pipe/filter.pipe';

@NgModule({
  declarations: [AnotacoesComponent, FilterPipe],
  imports: [
    CommonModule,
    AnotacoesRoutingModule,
    FormsModule
  ]
})
export class AnotacoesModule { }
