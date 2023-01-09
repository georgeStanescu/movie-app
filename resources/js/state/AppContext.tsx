import { createContext, Dispatch, FC, ReactNode } from 'react';
import { Action } from './actions';
import { AppState, initialState } from './appState';

interface AppContextProps {
    dispatch: Dispatch<Action>;
    state: AppState;
  }

export const AppContext = createContext<AppContextProps>({state: initialState, dispatch: () => {} });
AppContext.displayName = 'MoviesAppContext';

interface AppContextProviderProps extends AppContextProps {
    children: ReactNode;
}

export const AppContextProvider: FC<AppContextProviderProps> = ({children, dispatch, state}) => (
  <AppContext.Provider value={{dispatch, state}}>{children}</AppContext.Provider>
);
