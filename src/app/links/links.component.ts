import { Component, OnInit } from '@angular/core';
import { NotasService } from '../notas.service';

@Component({
    selector: 'app-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

    linksJson: any = []
    order: string = 'titulo';

    reverse: boolean = false;

    loading: any = {
        spiner: true,
        container: true
    }

    id: any;

    textoExemproJson: string = `
    {
        "links": [
          {
            "icon": "important",
            "id": "1552061787185",
            "titulo": "json-server",
            "url": "https://github.com/typicode/json-server"
          }
    }`

    constructor(private NotasService: NotasService) { }

    ngOnInit() {
        this.listarLinks();
    }

    private listarLinks() {
        this.NotasService.getLinks().subscribe(
            response => {
                this.linksJson = response;
                this.loading.spiner = false;
            },
            error => {
                this.loading.spiner = false;
                this.loading.container = false;
            }
        )
    }

    public deletar(id: string) {
        this.NotasService.delete(id).subscribe(
            sucesso => this.listarLinks()
        )
    }

    public setOrder(value: string) {
        if (this.order === value) {
            this.reverse = !this.reverse;
        }
        this.order = value;
    }


    // falta
    public editar(links: any) {
        this.id = `/edit/${links.id}`;
    }

}
