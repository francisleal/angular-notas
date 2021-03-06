import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LinksComponent } from './links.component'
import { LinksRoutingModule } from './links.routing.module';
import { LinkCadastroComponent } from './cadastro/link-cadastro.component';


import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [LinksComponent, LinkCadastroComponent],
  imports: [
    CommonModule,
    LinksRoutingModule,
    FormsModule,
    OrderModule
  ]
})

export class LinksModule { }
