import { Component, OnInit } from '@angular/core';
import { NotasService } from '../notas.service';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'app-senha',
    templateUrl: './senha.component.html',
    styleUrls: ['./senha.component.css']
})
export class SenhaComponent implements OnInit {

    constructor(private NotasService: NotasService, private Alert: AlertService) { }

    senhas: any[] = [];
    loading: boolean = false;
    pathname: string = "senhas"

    ngOnInit() {
        this.listarSenhas()
    }

    listarSenhas() {
        this.NotasService.getSenhas().subscribe(
            sucesso => {
                this.loading = true
                this.senhas = sucesso
            } 
        )
    }

    copiarSenha(id: any) {
        const copiar = document.getElementById(id) as HTMLInputElement;
        copiar.select()
        if(copiar) {
            this.Alert.sucesso('Senha copiada com sucesso')
        }
        document.execCommand("copy")
    }

    deleter(id: number) {
        this.NotasService.delete(id, this.pathname).subscribe(
            sucesso => {
                this.Alert.danger(`Senha deletada com sucesso`)
                this.listarSenhas()
            },
            error => this.Alert.danger(`Error ao deletar senha ${error}`)
        )
    }
}
