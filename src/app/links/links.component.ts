import { Component, OnInit } from '@angular/core';
import { NotasService } from '../notas.service';

@Component({
    selector: 'app-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

    linksJson: any = []
    show: boolean = true;
    order: string = 'titulo';

    reverse: boolean = false;

    constructor(private NotasService: NotasService) { }

    ngOnInit() {
        this.listarLinks();
    }

    private listarLinks() {
        this.NotasService.getLinks().subscribe(
            response => {
                this.linksJson = response;
                console.log(response.length)
                this.show = true;
            },
            error => {
                this.show = false;
            }
        )
    }

    public deletar(id: string) {
        this.NotasService.delete(id).subscribe(
            response => {
                this.listarLinks();
            }
        )
    }

    public setOrder(value: string) {
        if (this.order === value) {
          this.reverse = !this.reverse;
        }    
        this.order = value;

        console.log(value);
    }


    // falta
    public editar (links: any) {
        console.log(links.titulo)
    }

}
