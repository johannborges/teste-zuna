import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Dragon } from '../models/dragon.model';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DragonsServiceMock {
    constructor(
        private httpClient: HttpClient
    ){}

    formatDate(dragon: Dragon){
        dragon.createdAt = new Date(dragon.createdAt).toLocaleString();
    }

    getDragons(): Observable<Array<Dragon>>{
        return of([
            new Dragon(
                1, "Teste", "", "Filho da puta"
            ),

            new Dragon(
                2, "Teste", "", "Filho da puta"
            ),

            new Dragon(
                3, "Teste", "", "Filho da puta"
            )
        ]);
    }

    getDragon(id: string): Observable<Dragon>{
        return of(new Dragon(
            1, "Teste", "", "Filho da puta"
        ));
    }

    createDragon(name: string, type: string){
        return of(true);
    }

    editDragon(id: string, name: string, type: string){
        return of(true);
    }

    deleteDragon(id: string){
        return of(true);
    }
}