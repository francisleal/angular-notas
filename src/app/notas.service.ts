import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { Links } from './links/links';

@Injectable({
    providedIn: 'root'
})
export class NotasService {

    public url = environment.host

    constructor(private http: HttpClient) { }

    public getLinks(): Observable<Links[]> {
        return this.http.get<Links[]>(this.url);
    }

    public salvarLink(link: Links): Observable<Links> {
        return this.http.post<Links>(this.url, link);
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(this.url + "/" + id);
    }

}
