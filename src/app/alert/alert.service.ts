import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    public alertShowEmitter = new EventEmitter<any>()

    constructor() { }

    private alert(mensagen: string, tipo: string) {
        this.alertShowEmitter.emit({ mensagen, tipo });
    }

    primary(msg: string) {
        this.alert(msg, 'alert-primary')
    }

    sucesso(msg: string) {
        this.alert(msg, 'alert-success')
    }

    danger(msg: string) {
        this.alert(msg, 'alert-danger')
    }

    warning(msg: string) {
        this.alert(msg, 'alert-warning')
    }    

    info(msg: string) {
        this.alert(msg, 'alert-info')
    }

    light(msg: string) {
        this.alert(msg, 'alert-light')
    }
}
