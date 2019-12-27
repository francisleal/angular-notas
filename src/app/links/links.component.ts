import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotasService } from '../notas.service';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'app-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

    public linksJson: any[] = []
    public listaAlm: any[] = []

    public order: string = 'titulo'

    public reverse: boolean = false
    public loading: boolean
    public buttonConfirmaExclusao: boolean

    public filtro: string;
    public filtroAll: string;
    
    public pathname: string = "links"

    constructor(
        private router: Router,
        private NotasService: NotasService,
        private AlertService: AlertService
    ) { }

    ngOnInit() {
        this.listarLinks();
    }   

    private listarLinks() {
        this.NotasService.getLinks().subscribe(
            response => {
                this.loading = true;

                this.linksJson = response.filter(lista => lista.icon != 'alm');
                this.listaAlm = response.filter(lista => lista.icon == 'alm');
            },
            error => this.loading = false
        )
    }

    public deletar(id: string) {
        this.NotasService.delete(id, this.pathname).subscribe(
            sucesso => {
                this.listarLinks()
                this.AlertService.danger('excluido com sucesso')
            }
        )
    }

    public setOrder(value: string) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }
        this.order = value;
    }

    public editar(link: any) {
        this.router.navigate([`${this.pathname}/edit`, link.id])
    }

    public confirmaExclusao(confirmaExclusao?: any) {
        this.buttonConfirmaExclusao = confirmaExclusao
    }

    public filtrarLinksAlm() {
        if (this.listaAlm.length === 0 || this.filtro === undefined || this.filtro.trim() === '') {
            return this.listaAlm;
        }
        return this.listaAlm.filter(
            alm => alm.titulo.toLocaleLowerCase().includes(this.filtro.toLocaleLowerCase())
        );
    }

    public filtrarLinksAll() {
        if (this.linksJson.length === 0 || this.filtroAll === undefined || this.filtroAll.trim() === '') {
            return this.linksJson;
        }
        return this.linksJson.filter(
            all => all.titulo.toLocaleLowerCase().includes(this.filtroAll.toLocaleLowerCase())
        );
    }
}
