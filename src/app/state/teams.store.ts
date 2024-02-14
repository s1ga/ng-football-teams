import { HttpErrorResponse } from '@angular/common/http';
import { Team } from '@app/interfaces/team';
import withTeamsMethods from '@app/state/teams.methods';
import { withTeamsSelectors } from '@app/state/teams.selectors';
import {
  signalStore, withHooks, withState,
} from '@ngrx/signals';

export interface TeamState {
  teams: Team[];
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialState: TeamState = {
  teams: [],
  loading: false,
  error: null,
};

export const TeamsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withTeamsSelectors(),
  withTeamsMethods(),
  withHooks({
    onInit({ load }) {
      load();
    },
  }),
);
