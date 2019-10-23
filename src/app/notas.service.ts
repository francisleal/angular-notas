import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Links } from './links/links';
import { Anotacao } from './anotacoes/anotacao';

@Injectable({
    providedIn: 'root'
})
export class NotasService {



    public url = environment.host

    constructor(private http: HttpClient) { }

    public getLinks(): Observable<Links[]> {
        return this.http.get<Links[]>(`${this.url}/links`);
    }

    public salvarLink(link: Links): Observable<Links> {
        return this.http.post<Links>(`${this.url}/links`, link);
    }

    public editarLink(link: Links): Observable<Links> {
        return this.http.put<Links>(`${this.url}/links/${link.id}`, link);
    }

    public edit(id: any): Observable<any> {
        return this.http.get<any>(`${this.url}/links/${id}`);
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${this.url}/links/${id}`);
    }

    public getAnotacoes():Observable<Anotacao[]> {
        return this.http.get<Anotacao[]>(`${this.url}/anotacao/`);
    }

}
