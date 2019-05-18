import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    menuOpen: boolean = false;

    constructor(
        private router: Router
    ){
        router.events.subscribe((val) => {
            if(val instanceof NavigationEnd){
                this.menuOpen = false;
            }
        });
    }

    ngOnInit(){
    }

    toggleMenu(){
        this.menuOpen = !this.menuOpen;
    }
}
