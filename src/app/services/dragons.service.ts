import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Dragon } from '../models/dragon.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DragonsService {
    constructor(
        private httpClient: HttpClient
    ){}

    formatDate(dragon: Dragon){
        dragon.createdAt = new Date(dragon.createdAt).toLocaleString();
    }

    getDragons(): Observable<Array<Dragon>>{
        return this.httpClient.get<Array<Dragon>>(`${environment.uri}dragon`);
    }

    getDragon(id: string): Observable<Dragon>{
        return this.httpClient.get<Dragon>(`${environment.uri}dragon/${id}`);
    }

    createDragon(name: string, type: string){
        let date = new Date().toISOString();

        return this.httpClient.post(`${environment.uri}dragon/`, {
            "name": name,
            "type": type,
            "createdAt": date
        });
    }

    editDragon(id: string, name: string, type: string){
        return this.httpClient.put(`${environment.uri}dragon/${id}`, {
            "name": name,
            "type": type
        });
    }

    deleteDragon(id: string){
        return this.httpClient.delete(`${environment.uri}dragon/${id}`);
    }
}