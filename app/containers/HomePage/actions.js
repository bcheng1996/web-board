/*
 *
 * LanguageProvider actions
 *
 */

import { TOGGLE_LOCK, TOGGLE_MODE } from './constants';

export function toggleMode(mode) {
  return {
    type: TOGGLE_MODE,
    payload: mode,
  };
}

export function toggleLock() {
  return {
    type: TOGGLE_LOCK,
  };
}
