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
    loading: boolean;

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
        let copiar = document.getElementById(id) as HTMLInputElement;
        copiar.select()
        if(copiar) {
            this.Alert.sucesso('Senha copiada com sucesso')
        }
        document.execCommand("copy")
    }

    deleter(id: number) {
        this.NotasService.deletarSenha(id).subscribe(
            sucesso => {
                this.listarSenhas()
                this.Alert.sucesso(`Senha deletada com sucesso`)
            },
            error => this.Alert.danger(`Error ao deletar senha ${error}`)
        )
    }
}
