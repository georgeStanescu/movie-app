import { Movie } from '@/api/models';
import { ActionType } from './actionType';

export class Action {
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

export class SetMoviesAction extends Action {
  readonly movies: Movie[];

  constructor(movies: Movie[]) {
    super(ActionType.SET_MOVIES);
    this.movies = movies;
  }
}
