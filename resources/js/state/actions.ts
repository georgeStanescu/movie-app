import { ActionType } from './actionType';

export abstract class Action {
  readonly actionType: ActionType;

  constructor(actionType: ActionType) {
    this.actionType = actionType;
  }
}

export class SetLanguageAction extends Action {
  readonly language: string;

  constructor(language: string) {
    super(ActionType.SET_LANGUAGE);
    this.language = language;
  }
}
