import { Component, OnInit } from '@angular/core';
import { NotasService } from '../notas.service';

@Component({
    selector: 'app-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

    private linksJson: any = []
    private show: boolean = true;

    constructor(private NotasService: NotasService) { }

    ngOnInit() {
        this.listarLinks();
    }

    public listarLinks() {
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

    public editar(link: string) {
        console.log(link)
    }

}
