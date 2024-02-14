import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Team } from '@app/interfaces/team';
import { Observable } from 'rxjs';

const BE_URL = 'http://localhost:3000/teams';

@Injectable({ providedIn: 'root' })
export class TeamsService {
  private http = inject(HttpClient);

  public getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(BE_URL);
  }

  public addTeam(team: Omit<Team, 'id'>): Observable<Team> {
    return this.http.post<Team>(BE_URL, team);
  }

  public removeTeam(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${BE_URL}/${id}`);
  }
}
