import { Component, inject } from '@angular/core';
import {
  FormBuilder, FormsModule, ReactiveFormsModule, Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-team-editor',
  imports: [ReactiveFormsModule, FormsModule],
  template: `
    <div class="shadow-2xl rounded-2xl p-5">
      <form [formGroup]="teamForm" #formRef="ngForm" (ngSubmit)="submit()">
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
          <label for="name">Team logo</label>
          <input
            formControlName="logo"
            type="text"
            class="h-12 w-full border rounded-xl mt-1 pl-2"
            name="name"
            id="name"
            spellcheck="false"
          />
        </div>

        @if (teamForm.invalid && formRef.submitted) {
          <div class="bg-red-200 border border-red-400 p-3 rounded-xl mb-5">
            A team name and logo are required.
          </div>
        }

        <button class="bg-blue-700 hover:bg-blue-900 text-white p-4 rounded-xl">
          Add team
        </button>
      </form>
    </div>
  `,
})
export class TeamEditorComponent {
  private fb: FormBuilder = inject(FormBuilder);
  protected teamForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    logo: ['', [Validators.required]],
  });

  protected submit(): void {
    if (this.teamForm.invalid) return;
  }
}
