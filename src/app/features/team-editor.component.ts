import {
  Component, effect, inject, signal,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TeamsStore } from '@app/state/teams.store';

@Component({
  standalone: true,
  selector: 'app-team-editor',
  imports: [ReactiveFormsModule, FormsModule],
  template: `
    <div class="shadow-2xl rounded-2xl p-5">
      <form [formGroup]="teamForm" (ngSubmit)="submit($event)">
        <div class="flex flex-col mb-5">
          <label for="name">Team name</label>
          <input
            formControlName="name"
            type="text"
            class="h-12 w-full border rounded-xl mt-1 pl-2"
            name="name"
            id="name"
            spellcheck="false"
          />
        </div>

        <div class="flex flex-col mb-5">
          <label for="logo">Team logo</label>
          <input
            formControlName="logo"
            type="text"
            class="h-12 w-full border rounded-xl mt-1 pl-2"
            name="logo"
            id="logo"
            spellcheck="false"
          />
        </div>

        @if (teamForm.invalid && isSubmitted()) {
          <div class="bg-red-200 border border-red-400 p-3 rounded-xl mb-5">
            A team name and logo (valid URL) are required.
          </div>
        }

        <button [disabled]="isLoading()" class="bg-blue-700 hover:bg-blue-900 text-white p-4 rounded-xl">
          Add team
        </button>
      </form>
    </div>
  `,
})
export class TeamEditorComponent {
  private teamsStore = inject(TeamsStore);
  private fb: FormBuilder = inject(FormBuilder);

  protected isLoading = this.teamsStore.loading;
  protected isSubmitted = signal<boolean>(false);

  protected teamForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    logo: [
      '',
      [
        Validators.required,
        Validators.pattern(
          new RegExp(
            '^(https?:\\/\\/)?'
              + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
              + '((\\d{1,3}\\.){3}\\d{1,3}))'
              + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
              + '(\\?[;&a-z\\d%_.~+=-]*)?'
              + '(\\#[-a-z\\d_]*)?$',
            'i',
          ),
        ),
      ],
    ],
  });

  constructor() {
    effect(() => {
      const isLoading = this.isLoading();
      if (isLoading) this.teamForm.disable();
      else this.teamForm.enable();
    });
  }

  protected submit(event: Event): void {
    event.preventDefault();
    this.isSubmitted.set(true);
    if (this.teamForm.invalid) return;

    this.teamsStore.addTeam({
      name: this.teamForm.get('name')!.value,
      logo: this.teamForm.get('logo')!.value,
    });
    this.teamForm.reset();
    this.isSubmitted.set(false);
  }
}
