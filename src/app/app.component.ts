import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TeamEditorComponent } from '@app/features/team-editor.component';
import { TeamListComponent } from '@app/features/team-list.component';
import { HeaderComponent } from '@app/shared/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, TeamEditorComponent, TeamListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
