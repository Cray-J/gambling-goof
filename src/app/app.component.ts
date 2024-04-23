import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
    selector: 'root',
    template: `
      <app-header></app-header>
      <div class="view-container">
        <router-outlet></router-outlet>
      </div>
    `,
    styles: `
      .view-container {
        width: 100%;
      }
    `,
    standalone: true,
    imports: [HeaderComponent, RouterOutlet]
})
export class AppComponent {
}
