import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { InterceptorModule } from './interceptor/interceptor.module';

import { AppComponent } from './app.component';
import { DragonsService } from './services/dragons.service';
import { DragonsServiceMock } from './services/dragons.service.mock';
import { environment } from 'src/environments/environment';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },

    {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    },

    {
        path: 'main',
        loadChildren: './main/main.module#MainModule'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],

    imports: [
        BrowserModule,
        SharedModule,
        HttpClientModule,
        InterceptorModule,

        RouterModule.forRoot(
            routes,
            { useHash: true }
        )
    ],

    providers: [
        HttpClientModule,

        {
            provide: DragonsService,
            useClass: environment.mock ? DragonsServiceMock : DragonsService
        }
    ],
    
    bootstrap: [AppComponent]
})

export class AppModule { }