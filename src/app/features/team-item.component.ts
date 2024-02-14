import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-team-item',
  template: `
    @if (name && logo) {
    <div class="rounded-xl shadow-2xl">
      <img
        [src]="logo"
        [alt]="name + 'logo'"
        class="rounded-tl-xl rounded-tr-xl w-full max-h-72 object-contain pt-2"
      />
      <div class="text-3xl p-4 flex justify-between items-center">
        {{ name }}
        <button (click)="delete.emit()" class="material-symbols-outlined cursor-pointer">
          delete
        </button>
      </div>
    </div>
    }
  `,
})
export class TeamItemComponent {
  @Input({ required: true })
  public name: string = '';

  @Input({ required: true })
  public logo: string = '';

  @Output()
  public delete = new EventEmitter<void>();
}
