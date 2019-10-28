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

    linksJson: any[] = []
    listaAlm: any[] = []
    order: string = 'titulo';

    reverse: boolean = false;

    loading: boolean;

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
        this.NotasService.delete(id).subscribe(
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
        this.router.navigate(['links/edit', link.id])
    }

}
