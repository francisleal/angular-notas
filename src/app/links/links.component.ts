import { Component, OnInit } from '@angular/core';
import { NotasService } from '../notas.service';

@Component({
    selector: 'app-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

    linksJson:any = []

    constructor(private NotasService: NotasService) { }

    ngOnInit() {
        this.listarLinks();
    }

    public listarLinks() {
        this.NotasService.getLinks().subscribe(
            response => {
                this.linksJson = response;
            },
            error => {
                alert('servidor não encontrado')
            }
        )
    }

    public deletar(id:string) {
        console.log(id);
        // NotasService.delete(id).subscribe(
        //     response => {
        //         this.listarLinks();
        //     }
        // )
    }

}
