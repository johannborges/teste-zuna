import { Component, OnInit } from '@angular/core';
import { EstagiarioService } from '../../services/estagiario.service';
import { Estagiario } from '../../models/estagiario.model';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-estagiario-list',
    templateUrl: './estagiario-list.component.html',
    styleUrls: ['./estagiario-list.component.scss']
})

export class EstagiarioListComponent implements OnInit {
    estagiarios: Array<Estagiario>;

    constructor(
        private estagiarioService: EstagiarioService
    ) {}

    ngOnInit() {
        this.getEstagiarios();
    }

    getEstagiarios(){
        this.estagiarioService.getEstagiarios().subscribe((res) => {
            this.estagiarios = res;
        });
    }

    deleteEstagiario(id: string){
        Swal.fire({
            title: "Tem certeza?",
            text: "Uma vez confirmada, esta operação será irreversível.",
            type: "warning",
            confirmButtonText: "Deletar",
            cancelButtonText: "Não deletar",
            showCancelButton: true
        }).then((confirmed) => {
            if(confirmed.value){
                this.estagiarioService.deleteEstagiario(id).subscribe((res) => {
                    this.estagiarios.splice(parseInt(id) - 1, 1);

                    Swal.fire({
                        title: "Operação bem sucedida",
                        text: `O estagiário de código ${id} foi deletado.`,
                        type: "success"
                    });
                }, (err) => {
                    console.log(err);
                });
            }
        })
    }
}