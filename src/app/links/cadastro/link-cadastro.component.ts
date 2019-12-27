import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Links } from '../links';
import { NotasService } from 'src/app/notas.service';
import { AlertService } from 'src/app/alert/alert.service';

@Component({
    selector: 'app-link-cadastro',
    templateUrl: './link-cadastro.component.html',
    styleUrls: ['../links.component.css']
})
export class LinkCadastroComponent implements OnInit {

    public link: Links = new Links()
    public save: boolean = true
    public inscricao: Subscription
    public pathname : string = 'links'

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private notasService: NotasService,
        private alertService: AlertService
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
            sucesso => this.salvarSucesso(sucesso.titulo),
            error => this.salvarError(error.messag)
        )
    }

    public editar() {
        this.notasService.editarLink(this.link).subscribe(
            sucesso => this.salvarSucesso(sucesso.titulo),
            error => this.salvarError(error.messag)
        )
    }

    private salvarSucesso (mensagem: string) {
        this.alertService.sucesso(`${mensagem} - editado com sucesso`)
        this.router.navigate([`/${this.pathname}`]);
    }
    
    private salvarError (messagem: string) {
        this.alertService.danger(`ERROR - ${messagem}`)
    }

    private paginaEditar () {
        this.inscricao = this.route.params.subscribe(
            route => {
                if (typeof route.id != 'undefined') {

                    this.notasService.edit(route.id, this.pathname).subscribe(
                        link => this.link = link,
                        error => this.alertService.danger(`ERROR - ${error.message}`)
                    )

                    this.save = false;
                }
            }
        )
    }    
}
