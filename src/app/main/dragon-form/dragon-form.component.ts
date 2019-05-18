import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Dragon } from 'src/app/models/dragon.model';
import { DragonsService } from 'src/app/services/dragons.service';

@Component({
    selector: 'app-dragon-form',
    templateUrl: './dragon-form.component.html',
    styleUrls: ['./dragon-form.component.scss']
})

export class DragonFormComponent implements OnInit {
    form: FormGroup;
    
    id: string;
    dragon: Dragon;

    constructor(
        private formBuilder: FormBuilder,
        private dragonsService: DragonsService,
        private activedRoute: ActivatedRoute,
        private router: Router
    ){
        if(this.activedRoute.snapshot.params['id'] !== undefined){
            this.id = this.activedRoute.snapshot.params['id'];
        }
    }

    ngOnInit(){
        this.form = this.formBuilder.group({
            name: [null, [
                Validators.required
            ]],

            type: [null, [
                Validators.required
            ]]
        })

        if(this.id){
            this.dragonsService.getDragon(this.id).subscribe((res) => {
                this.dragon = res;
    
                this.dragonsService.formatDate(this.dragon);

                this.form.controls.name.setValue(this.dragon.name);
                this.form.controls.type.setValue(this.dragon.type);
            });
        }
    }

    sendForm(){
        if(this.form.valid){
            if(!this.id){
                this.dragonsService.createDragon(this.form.controls.name.value, this.form.controls.type.value).subscribe((res) => {
                    this.router.navigate(['/main/list-dragons']);
                }, (err) => {
                    console.log(err);
                });
            }

            else{
                this.dragonsService.editDragon(this.id, this.form.controls.name.value, this.form.controls.type.value).subscribe((res) => {
                    this.router.navigate(['/main/list-dragons']);
                }, (err) => {
                    console.log(err);
                });
            }
        }
    }
}