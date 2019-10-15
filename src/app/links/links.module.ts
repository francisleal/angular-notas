import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksComponent } from './links.component'
import { LinksRoutingModule } from './links.routing.module';
import { LinkCadastroComponent } from './cadastro/link-cadastro.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LinksComponent, LinkCadastroComponent],
  imports: [
    CommonModule,
    LinksRoutingModule,
    FormsModule
  ]
})

export class LinksModule { }
