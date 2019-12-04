import { Component, OnInit } from '@angular/core';

import { NotasService } from '../notas.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public servidor: any = {
        loading: true,
        dashboard: true
    };

    countAnotacoes: any = []

    public graficoLinksData: number[] = [];
    public graficoColor = [{ backgroundColor: ['#007bff'] }];

    public graficoAntData = [100, 50];
    public graficoAntColor = [{ backgroundColor: ['rgba(0,0,255,0.3)'] }];

    public graficoSenhaData: number[] = [];
    public graficoSenhaColor = [{ backgroundColor: ['#21ff00']}]
    
    public jsonExemplo = `
        {
            "anotacao": [
                {
                    "id":"notas",
                    "notas": [ 
                        {
                            "id": "number",
                            "titulo": "texto",
                            "descricao": "texto"
                        }                                
                    ]
                }
            ],
            "senhas": [
                {
                  "id": "number",
                  "nome": "text",
                  "senha": "passowd"
                }
            ],
            "links": [
                {
                  "id": "number",
                  "icon": "icom",
                  "titulo": "texto",
                  "url": "https://texto"
                }
            ]
        }
    `

    constructor(private notasService: NotasService) { }

    ngOnInit() {
        this.graficoLinks()
        this.graficoAnotacoes()
        this.graficoSenha()
    }

    private graficoLinks() {
        this.notasService.getLinks().subscribe(
            quantidade => {
                this.graficoLinksData = [quantidade.length, (100 - quantidade.length)]
                this.servidor.loading = false
            },
            error => {
                this.servidor.loading = false
                this.servidor.dashboard = false
                console.log('error getLinks', error)
            }
        )
    }   

    private graficoAnotacoes() {
        this.notasService.getAnotacoes().subscribe(
            sucesso => {              
                this.countAnotacoes = Object.values(sucesso)[1];
                this.graficoAntData = [this.countAnotacoes.length, (100 - this.countAnotacoes.length)]
            },
            error => console.log('error getAnotacoes', error)
        )
    }

    private graficoSenha() {
        this.notasService.getSenhas().subscribe(
            quantidade => this.graficoSenhaData = [quantidade.length, (100 - quantidade.length)],
            error => console.log('error getSenhas', error)
        )
    }
}
