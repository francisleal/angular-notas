import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SenhaComponent } from './senha.component';
import { SenhaRoutingModule } from './senha.routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SenhaComponent],
  imports: [
    CommonModule,
    SenhaRoutingModule,
    ReactiveFormsModule
  ]
})
export class SenhaModule { }
