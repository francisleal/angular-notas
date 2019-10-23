import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Links } from '../links';
import { NotasService } from 'src/app/notas.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-link-cadastro',
    templateUrl: './link-cadastro.component.html',
    styleUrls: ['../links.component.css']
})
export class LinkCadastroComponent implements OnInit {

    public link: Links = new Links()
    public save: boolean = true
    public inscricao: Subscription


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private notasService: NotasService,
    ) { }

    ngOnInit() {
        this.paginaEditar()
    }

    ngOnDestroy() {
        this.inscricao.unsubscribe();
    }

    public salvar() {
        this.link.id = Math.floor(Math.random() * 999999);

        this.notasService.salvarLink(this.link).subscribe(
            sucesso => console.log('salvo com sucesso', sucesso),
            error => console.log('error->', error)
        )
    }

    public editar() {
        this.notasService.editarLink(this.link).subscribe(
            sucesso => console.log('editado com sucesso', sucesso),
            error => console.log('error->', error)
        )
    }

    paginaEditar () {
        this.inscricao = this.route.params.subscribe(
            route => {
                if (typeof route.id != 'undefined') {
                    
                    this.notasService.edit(route.id).subscribe(
                        link => this.link = link,
                        error => console.log('edit error->', error)
                    )

                    this.save = false;
                }
            }
        )
    }

    public voltar() {
        this.router.navigate(['/links']);
    }
}
