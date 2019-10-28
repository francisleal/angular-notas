import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { Usuario } from './usuario';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public usuario: Usuario = new Usuario()
    public remember: boolean = true;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.getLocalStorage();
    }

    logar() {
        this.authService.logar(this.usuario)
        this.setItemLocalStorage()
    }

    getLocalStorage() {
        let localStorageGetItem = localStorage.getItem("usuario");

        if (localStorageGetItem != null) {
            let getItem = JSON.parse(localStorageGetItem)

            this.usuario.nome = getItem.nome;
            this.usuario.senha = getItem.senha;
        }
    }

    setItemLocalStorage() {
        if (this.remember == true) {
            localStorage.setItem("usuario", JSON.stringify(this.usuario));
        } else {
            localStorage.removeItem("usuario");
        }
    }
}
