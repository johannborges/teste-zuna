import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { environment } from 'src/environments/environment';

import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main.component';
import { EstagiarioListComponent } from './estagiario-list/estagiario-list.component';
import { CreateEstagiarioComponent } from './create-estagiario/create-estagiario.component';
import { CompleteEstagiarioComponent } from './complete-estagiario/complete-estagiario.component';

import { EstagiarioService } from '../services/estagiario.service';
import { EstagiariosServiceMock } from '../services/estagiario.service.mock';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,

        children: [
            {
                path: '',
                redirectTo: 'list-estagiarios',
                pathMatch: 'full'
            },
        
            {
                path: 'list-estagiarios',
                component: EstagiarioListComponent
            },
        
            {
                path: 'create-estagiario',
                component: CreateEstagiarioComponent
            },
        
            {
                path: 'complete-estagiario/:id',
                component: CompleteEstagiarioComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,

        RouterModule.forChild(routes)
    ],

    declarations: [
        MainComponent,
        EstagiarioListComponent,
        CreateEstagiarioComponent,
        CompleteEstagiarioComponent
    ],

    providers: [
        {
            provide: EstagiarioService,
            useClass: environment.mock ? EstagiariosServiceMock : EstagiarioService
        }
    ]
})

export class MainModule{}