import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SenhaComponent } from './senha.component';

const routes: Routes = [
    {
        path: '',
        component: SenhaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SenhaRoutingModule { }