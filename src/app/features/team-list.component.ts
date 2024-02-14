import {
  Component, effect, inject, Signal,
} from '@angular/core';
import { TeamItemComponent } from '@app/features/team-item.component';
import { Team } from '@app/interfaces/team';
import { ToasterService } from '@app/services/toaster.service';
import { LoaderComponent } from '@app/shared/loader.component';
import { TeamsStore } from '@app/state/teams.store';

@Component({
  standalone: true,
  selector: 'app-team-list',
  imports: [TeamItemComponent, LoaderComponent],
  template: `
    @if (isLoading()) {
      <app-loader />
    } @else {
      <div class="grid grid-cols-3 gap-4">
        @for (team of teams(); track team.id) {
          <app-team-item
            [logo]="team.logo"
            [name]="team.name"
            (delete)="removeItem(team.id)"
          />
        } @empty {
          <span>There are no teams added yet.</span>
        }
      </div>
    }
  `,
})
export class TeamListComponent {
  private toasterService = inject(ToasterService);
  private teamsStore = inject(TeamsStore);
  protected teams: Signal<Team[]> = this.teamsStore.teams;
  protected isLoading: Signal<boolean> = this.teamsStore.loading;

  constructor() {
    effect(
      () => {
        const message = this.teamsStore.errorMessage();
        if (message) {
          this.toasterService.showError(undefined, message);
          this.teamsStore.clearError();
        }
      },
      { allowSignalWrites: true },
    );
  }

  protected removeItem(id: string): void {
    this.teamsStore.removeTeam(id);
  }
}
