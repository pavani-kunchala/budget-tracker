import { Component } from '@angular/core';
 
 
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
 

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  title = 'Angular Budget Planner';
 toggleNav() {
  const nav = document.querySelector('.nav-links');
  nav?.classList.toggle('show');
}
}
