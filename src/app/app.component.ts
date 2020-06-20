import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SpiralJS';
  navbarOpen = false;
  @ViewChild('navBarButton', {read: ElementRef}) private navBarButton: ElementRef; 
  @ViewChild('navMenu') private navMenu: ElementRef; 

  constructor(private router: Router){}
  
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  closeNavbar(){
    this.navbarOpen = false;
  }

  gotoHome() {
    this.router.navigate(["/"]);
    this.closeNavbar();
  }

}
