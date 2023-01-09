import { Movie, SearchResponse } from '@/api/models';
import { MoviesDataGrid } from '@/Components';
import { MatrixButtonId, MatrixReloadedButtonId, MatrixRevolutionsButtonId } from '@/constants/testIdentifiers';
import { AppContextProvider, appReducer, initialState } from '@/state';
import { SetMoviesAction } from '@/state/actions';
import { Button, ButtonGroup, Grid } from '@mui/material';
import axios from 'axios';
import { useReducer, useState } from 'react';

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchMovies = async (query) => {
    const response = await axios.get<SearchResponse>(`/api/movies?s=${query}`);

    if (response?.data?.Response) {
      setMovies(response.data.Search);
      dispatch(new SetMoviesAction(response.data.Search));
    }
  };

  return (
    <>
      <AppContextProvider state={state} dispatch={dispatch}>
        <Grid container justifyContent={'center'} direction="column" >
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
          >
            <Button
              data-testid={MatrixButtonId}
              onClick={() => fetchMovies('Matrix')}>Query Matrix</Button>
            <Button
              data-testid={MatrixReloadedButtonId}
              onClick={() => fetchMovies('Matrix Reloaded')}>Query Matrix Reloaded</Button>
            <Button
              data-testid={MatrixRevolutionsButtonId}
              onClick={() => fetchMovies('Matrix Revolutions')}>Query Matrix Revolutions</Button>
          </ButtonGroup>

          <MoviesDataGrid movies={movies} />
        </Grid>
      </AppContextProvider>
    </>
  );
}
