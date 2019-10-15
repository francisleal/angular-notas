import { Component, OnInit } from '@angular/core';
import { Links } from '../links';

@Component({
    selector: 'app-link-cadastro',
    templateUrl: './link-cadastro.component.html',
    styleUrls: ['../links.component.css']
})
export class LinkCadastroComponent implements OnInit {

    public links: Links = new Links()

    constructor() { }

    ngOnInit() { }

    public salvar() {
        console.log(this.links);
    }

}
