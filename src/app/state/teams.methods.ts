import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Team } from '@app/interfaces/team';
import { TeamsService } from '@app/services/teams.service';
import { initialState, TeamState } from '@app/state/teams.store';
import {
  patchState, signalStoreFeature, withMethods, withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  catchError, finalize, of, tap,
} from 'rxjs';

export default function withTeamsMethods() {
  return signalStoreFeature(
    withState<TeamState>(initialState),
    withMethods((state) => {
      const injector = inject(Injector);
      const teamsService = inject(TeamsService);

      return {
        addTeam(team: Omit<Team, 'id'>) {
          patchState(state, { loading: true });
          rxMethod<Team>(
            () => teamsService.addTeam(team).pipe(
              tap((newTeam: Team) => patchState(state, {
                teams: [...state.teams(), newTeam],
                error: initialState.error,
              })),
              catchError((err: HttpErrorResponse) => {
                patchState(state, { error: err });
                return of(err);
              }),
              finalize(() => patchState(state, { loading: false })),
            ),
            { injector },
          );
        },
        removeTeam(id: string) {
          patchState(state, { loading: true });
          rxMethod(
            () => teamsService.removeTeam(id).pipe(
              tap(() => patchState(state, {
                teams: state.teams().filter((t: Team) => t.id !== id),
                error: initialState.error,
              })),
              catchError((err: HttpErrorResponse) => {
                patchState(state, { error: err });
                return of(err);
              }),
              finalize(() => patchState(state, { loading: false })),
            ),
            { injector },
          );
        },
        load() {
          patchState(state, { loading: true });
          rxMethod<Team[]>(() => teamsService.getTeams().pipe(
            tap((teams: Team[]) => patchState(state, {
              teams,
              error: initialState.error,
            })),
            catchError((err: HttpErrorResponse) => {
              patchState(state, { error: err });
              return of(err);
            }),
            finalize(() => patchState(state, { loading: false })),
          ));
        },
        clearError() {
          patchState(state, { error: initialState.error });
        },
      };
    }),
  );
}
