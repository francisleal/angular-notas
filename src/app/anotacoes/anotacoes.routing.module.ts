import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnotacoesComponent } from './anotacoes.component';

const routes: Routes = [
    {
        path: '',
        component: AnotacoesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnotacoesRoutingModule { }