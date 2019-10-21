import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Links } from '../links';
import { NotasService } from 'src/app/notas.service';

@Component({
    selector: 'app-link-cadastro',
    templateUrl: './link-cadastro.component.html',
    styleUrls: ['../links.component.css']
})
export class LinkCadastroComponent implements OnInit {

    public link: Links = new Links()
    public save : boolean = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private notasService: NotasService,
    ) { }

    ngOnInit() {
        if (this.route.snapshot.url[0].path == 'edit') {            
            this.edit(this.route.snapshot.paramMap.get('id'))
        }
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

    public edit(rota: string) {
        this.save = false;

        this.notasService.edit(rota).subscribe(
            editar => {
                this.link.id = editar.id
                this.link.url = editar.url;
                this.link.icon = editar.icon
                this.link.titulo = editar.titulo;
            },
            error => console.log('edit error->', error)
        )
    }

    public voltar() {
        this.router.navigate(['/links']);
    }
}
