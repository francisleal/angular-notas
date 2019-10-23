import { Component, OnInit } from '@angular/core';

import { NotasService } from '../notas.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public graficoLinksLabels = ['Links'];
    public graficoLinksData: number[] = [];
    public graficoLinksType = 'doughnut';
    public graficoColor = [{ backgroundColor: ['#007bff'] }];

    public doughnutChartLabels = ['undefined'];
    public doughnutChartData = [100, 50];
    public doughnutChartType = 'doughnut';
    public doughnutChartColor = [{ backgroundColor: ['rgba(0,0,255,0.3)'] }];

    private servidor: any = {
        loading: true,
        dashboard: true
    };

    constructor(private notasService: NotasService) { }

    ngOnInit() {
        this.graficoLinks()
    }

    public graficoLinks() {
        this.notasService.getLinks().subscribe(
            sucesso => {
                this.graficoLinksData = [sucesso.length, (100 - sucesso.length)]
                this.servidor.loading = false
            },
            error =>{
                this.servidor.loading = false
                this.servidor.dashboard = false
            } 
        )
    }
}
