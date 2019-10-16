import { Component, OnInit } from '@angular/core';
import { Links } from '../links';
import { NotasService } from 'src/app/notas.service';

@Component({
    selector: 'app-link-cadastro',
    templateUrl: './link-cadastro.component.html',
    styleUrls: ['../links.component.css']
})
export class LinkCadastroComponent implements OnInit {

    public links: Links = new Links()

    constructor(private notasService: NotasService) { }

    ngOnInit() { }

    public salvar() {
        this.links.id = Math.floor(Math.random() * 9999);

        this.notasService.salvarLink(this.links).subscribe(
            response => {
                console.log('salvo com sucesso', this.links);
            },
            error => {
                console.log('error->',error);
            }
        )
    }
}
