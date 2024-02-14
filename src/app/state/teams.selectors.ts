import { computed } from '@angular/core';
import { initialState } from '@app/state/teams.store';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';

export function withTeamsSelectors() {
  return signalStoreFeature(
    withState(initialState),
    withComputed((state) => ({
      errorMessage: computed(() => {
        if (!state.error()) return null;

        const { status, statusText } = state.error()!;
        if (status >= 400 && status < 500) return statusText;
        return 'Internal server error';
      }),
    })),
  );
}
