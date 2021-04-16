import { TOGGLE_MODE, MODES, TOGGLE_LOCK } from './constants';

export const initialState = {
    mode: MODES.EDIT,
    locked: false
};

/* eslint-disable default-case, no-param-reassign */
export default function homePageReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MODE:
            return {
                ...state,
                mode: action.payload
            }
        case TOGGLE_LOCK:
            return {
                ...state,
                locked: !state.locked
            }
        default:
            return state;
    }
}
