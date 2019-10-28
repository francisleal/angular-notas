import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Links } from '../links';
import { NotasService } from 'src/app/notas.service';
import { Subscription } from 'rxjs';
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
            sucesso => this.alertService.sucesso(`${sucesso.titulo} - salvo com sucesso`),
            error => this.alertService.danger(`ERROR - ${error.message}`)
        )
    }

    public editar() {
        this.notasService.editarLink(this.link).subscribe(
            sucesso => this.alertService.sucesso(`${sucesso.titulo} - editado com sucesso`),
            error => this.alertService.danger(`ERROR - ${error.message}`)
        )
    }

    paginaEditar () {
        this.inscricao = this.route.params.subscribe(
            route => {
                if (typeof route.id != 'undefined') {
                    
                    this.notasService.edit(route.id).subscribe(
                        link => this.link = link,
                        error => this.alertService.danger(`ERROR - ${error.message}`)
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
