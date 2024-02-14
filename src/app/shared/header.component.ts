import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header',
  template: `
    <header class="h-16 p-8 bg-blue-900 text-white text-2xl flex items-center">
      <h1>Football teams</h1>
    </header>
  `,
})
export class HeaderComponent {

}
