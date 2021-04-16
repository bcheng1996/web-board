import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the languageToggle state domain
 */
const selectHomePage = state => state.homePage || initialState;

const makeSelectMode = createSelector(
  selectHomePage,
  homePageState => homePageState.mode,
);

const makeSelectLocked = createSelector(
  selectHomePage,
  homePageState => homePageState.locked,
);

export { selectHomePage, makeSelectMode, makeSelectLocked };
