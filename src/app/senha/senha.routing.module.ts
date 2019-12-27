import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SenhaComponent } from './senha.component';
import { SenhaCadastroComponent } from './cadastro/senha-cadastro.component';

const routes: Routes = [
    {
        path: '',
        component: SenhaComponent
    },
    {
        path: 'add',
        component: SenhaCadastroComponent
    },
    {
        path: 'edit/:id',
        component: SenhaCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SenhaRoutingModule { }