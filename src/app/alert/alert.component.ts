import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
    selector: 'alert',
    styleUrls: ['./alert.component.css'],
    template: `
    <div *ngIf="alert" class="alert" [ngClass]="styleAlertType()" role="alert">
        <strong>{{ alertMessage }}</strong>
        <button type="button" class="close" (click)="close()">
            <span>&times;</span>
        </button>
    </div>
    ` ,
})
export class AlertComponent implements OnInit {

    private alertMessage: string
    private alertType: string
    private alert: boolean = false

    constructor(public alertService: AlertService) { }

    ngOnInit() {
        this.alerta()
    }

    alerta() {
        this.alertService.alertShowEmitter.subscribe(
            (alert: any) => {
                this.alertMessage = alert.mensagen
                this.alertType = alert.tipo
                this.alert = true
                this.closeTimeout()
            }
        )
    }

    styleAlertType() {
        return this.alertType
    }

    close() {
        this.alert = false
    }

    closeTimeout() {
        setTimeout(() => this.alert = false, 4000);
    }

}
