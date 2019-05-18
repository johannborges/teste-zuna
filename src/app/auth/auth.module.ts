import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,

        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
        
            {
                path: 'login',
                component: LoginComponent
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
        AuthComponent,
        LoginComponent
    ]
})

export class AuthModule{}