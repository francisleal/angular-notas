import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinksComponent} from './links.component'
import { LinkCadastroComponent } from './cadastro/link-cadastro.component';

const routes: Routes = [
    {
        path: '',
        component: LinksComponent
    },
    {
        path: 'add',
        component: LinkCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LinksRoutingModule { }