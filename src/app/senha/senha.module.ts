import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SenhaComponent } from './senha.component';
import { SenhaRoutingModule } from './senha.routing.module';
import { SenhaCadastroComponent } from './cadastro/senha-cadastro.component';



@NgModule({
  declarations: [SenhaComponent, SenhaCadastroComponent],
  imports: [
    CommonModule,
    SenhaRoutingModule,
    ReactiveFormsModule
  ]
})
export class SenhaModule { }
