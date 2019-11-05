import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { Usuario } from './usuario';
import { NotasService } from '../notas.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public usuario: Usuario = new Usuario()
    public remember: boolean = true
    public loading: boolean = false

    constructor(
        private authService: AuthService,
        private localStorage: NotasService
    ) { }

    ngOnInit() {
        this.getItemsLocalStorage();
    }

    logar() {
        this.authService.logar(this.usuario)
        this.setItemLocalStorage()
    }

    private getItemsLocalStorage() {
        if (this.localStorage.getItems('usuario')) {

            this.usuario.nome = this.localStorage.getItems('usuario')['nome'];
            this.usuario.senha = this.localStorage.getItems('usuario')['senha'];

            if (this.localStorage.getItems('usuario')['remember'] == true) {
                this.loading = true
                setTimeout(() => this.logar(), 0);
            }
        }
    }

    private setItemLocalStorage() {
        let remember = {
            nome: this.usuario.nome,
            senha: this.usuario.senha,
            remember: this.remember
        }
        this.localStorage.setItems('usuario', remember)
    }
}