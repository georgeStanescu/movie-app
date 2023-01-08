import { SetLanguageAction } from './actions';
import { appReducer } from './appReducer';
import { initialState } from './appState';

describe('appReducer', () => {
  test('should update language', () => {
    const expectedLanguage = 'test';
    const updatedState = appReducer(initialState, new SetLanguageAction(expectedLanguage));

    expect(updatedState.language).toBe(expectedLanguage);
  });
});
