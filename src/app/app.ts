import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

 
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [CommonModule, RouterOutlet, RouterLink]
})
export class App {
  title = 'Angular Budget Planner';
  // app.component.ts or your layout component
toggleNav() {
  const nav = document.querySelector('.nav-links');
  nav?.classList.toggle('show');
}

}