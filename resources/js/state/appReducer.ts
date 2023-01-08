import { Action, SetLanguageAction } from './actions';
import { ActionType } from './actionType';
import { AppState } from './appState';

export const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.actionType) {
  case ActionType.SET_LANGUAGE:
  {
    const setLanguageAction = action as SetLanguageAction;
    return {
      ...state,
      language: setLanguageAction.language
    };
  }
  default:
    return state;
  }
};
