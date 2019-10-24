import { Component, OnInit } from '@angular/core';

import { NotasService } from '../notas.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    private servidor: any = {
        loading: true,
        dashboard: true
    };

    countAnotacoes: any = []

    public graficoLinksData: number[] = [];
    public graficoColor = [{ backgroundColor: ['#007bff'] }];

    public graficoAntData = [100, 50];
    public graficoAntColor = [{ backgroundColor: ['rgba(0,0,255,0.3)'] }];    

    constructor(private notasService: NotasService) { }

    ngOnInit() {
        this.graficoLinks()
        this.graficoAnotacoes()
    }

    private graficoLinks() {
        this.notasService.getLinks().subscribe(
            sucesso => {
                this.graficoLinksData = [sucesso.length, (100 - sucesso.length)]
                this.servidor.loading = false
            },
            error => {
                this.servidor.loading = false
                this.servidor.dashboard = false
            }
        )
    }   

    private graficoAnotacoes() {
        this.notasService.getAnotacoes().subscribe(
            sucesso => {              
              this.countAnotacoes = Object.values(sucesso)[1];
              this.graficoAntData = [this.countAnotacoes.length, (100 - this.countAnotacoes.length)]                
            }
        )
    }
}
