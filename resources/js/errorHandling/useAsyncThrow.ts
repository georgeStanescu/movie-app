import { useCallback, useState } from 'react';

/** A workaround for error boundary async limitations. */
export const useAsyncThrow = () => {
  const [, setError] = useState();
  return useCallback(
    (error: Error) =>
      setError(() => {
        throw error;
      }),
    [setError]
  );
};
