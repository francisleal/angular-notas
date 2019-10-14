import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnotacoesRoutingModule } from './anotacoes.routing.module';
import { AnotacoesComponent } from './anotacoes.component';

@NgModule({
  declarations: [AnotacoesComponent],
  imports: [
    CommonModule,
    AnotacoesRoutingModule
  ]
})
export class AnotacoesModule { }
