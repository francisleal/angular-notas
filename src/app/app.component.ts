import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './login/auth.service';
import { NotasService } from './notas.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public mostrarMenu: boolean = false

    constructor(
        private authService: AuthService,
        private router: Router,
        private localStorage: NotasService) { }

    ngOnInit() {
        this.authService.mostarMenuEmitter.subscribe(
            (mostrar: boolean) => this.mostrarMenu = mostrar
        )

        if (this.mostrarMenu === false) {
            this.router.navigate(['/login'])
        }
    }

    private localStorageDeslogar() {
        let remember = {
            nome: this.localStorage.getItems('usuario').nome,
            senha: this.localStorage.getItems('usuario').senha,
            remember: false
        }
        this.localStorage.setItems('usuario', remember);
    }

    deslogar() {
        this.mostrarMenu = false;
        this.router.navigate(['/login'])
        this.localStorageDeslogar()
    }
}