import { AppContextProvider, appReducer, initialState } from '@/state';
import { FC, ReactNode, useReducer } from 'react';
import ErrorBoundary from './errorHandling/ErrorBoundary';

interface RootProps {
    children: ReactNode;
}

const Root: FC<RootProps> = ({children}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <>
      <AppContextProvider state={state} dispatch={dispatch}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </AppContextProvider>
    </>
  );
};

export default Root;
