import { Component, OnInit } from '@angular/core';
import { DragonsService } from '../../services/dragons.service';
import { Dragon } from '../../models/dragon.model';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dragon-list',
    templateUrl: './dragon-list.component.html',
    styleUrls: ['./dragon-list.component.scss']
})

export class DragonListComponent implements OnInit {
    dragons: Array<Dragon>;

    constructor(
        private dragonsService: DragonsService
    ) {}

    ngOnInit() {
        this.getDragons();
    }

    getDragons(){
        this.dragonsService.getDragons().subscribe((res) => {
            this.dragons = res;

            this.dragons.forEach((dragon) => {
                this.dragonsService.formatDate(dragon);
            })
        });
    }

    deleteDragon(id: string){
        Swal.fire({
            title: "Tem certeza?",
            text: "Você poderá recriar esse mesmo dragão, mas nem mesmo a mais poderosa necromancia o trará de volta.",
            type: "warning",
            confirmButtonText: "Deletar",
            cancelButtonText: "Não deletar",
            showCancelButton: true
        }).then((confirmed) => {
            if(confirmed.value){
                this.dragonsService.deleteDragon(id).subscribe((res) => {
                    this.getDragons();
                }, (err) => {
                    console.log(err);
                });
            }
        })
    }
}