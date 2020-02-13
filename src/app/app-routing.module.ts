import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'anotacoes',
        loadChildren: './anotacoes/anotacoes.module#AnotacoesModule'
    },
    {
        path: 'links',
        loadChildren: './links/links.module#LinksModule'
    },
    {
        path: 'senhas',
        loadChildren: './senha/senha.module#SenhaModule'
    },
    {
        path: 'nuvemSenhas',
        loadChildren: './nuvem/senha/senha.module#SenhaModule'
    },
    {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
    },    
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }