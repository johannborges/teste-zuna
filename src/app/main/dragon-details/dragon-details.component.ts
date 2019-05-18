import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dragon } from 'src/app/models/dragon.model';
import { DragonsService } from 'src/app/services/dragons.service';

@Component({
    selector: 'app-dragon-details',
    templateUrl: './dragon-details.component.html',
    styleUrls: ['./dragon-details.component.scss']
})

export class DragonDetailsComponent implements OnInit {
    id: string;
    dragon: Dragon;

    constructor(
        private dragonsService: DragonsService,
        private activedRoute: ActivatedRoute
    ){
        this.id = this.activedRoute.snapshot.params['id'];
    }

    ngOnInit(){
        this.dragonsService.getDragon(this.id).subscribe((res) => {
            this.dragon = res;

            this.dragonsService.formatDate(this.dragon);
        });
    }
}