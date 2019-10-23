import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './login/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'angularNotas';

    public mostrarMenu: boolean = false

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.authService.mostarMenuEmitter.subscribe(
            (mostrar: boolean) => this.mostrarMenu = mostrar
        )

        if(this.mostrarMenu === false) {
            this.router.navigate(['/login'])
        }
    }
    
    deslogar() {
        this.mostrarMenu = false;
        this.router.navigate(['/login'])
    }
}