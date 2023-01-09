import { Movie, SearchResponse } from '@/api/models';
import { MoviesDataGrid } from '@/Components';
import { MatrixButtonId, MatrixReloadedButtonId, MatrixRevolutionsButtonId } from '@/constants/testIdentifiers';
import { useAsyncThrow } from '@/errorHandling/useAsyncThrow';
import { useAppContext } from '@/state';
import { SetMoviesAction } from '@/state/actions';
import { Button, ButtonGroup, Grid } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

export default function Movies() {
  const {dispatch} = useAppContext();
  const [movies, setMovies] = useState<Movie[]>([]);
  const asyncThrow = useAsyncThrow();

  const fetchMovies = async (query) => {
    const response = await axios.get<SearchResponse>(`/api/movies?s=${query}`);

    if (response?.data?.Response) {
      setMovies(response.data.Search);
      dispatch(new SetMoviesAction(response.data.Search));
    }
  };

  return (
    <>
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
        <ButtonGroup
          variant="contained"
          aria-label="outlined button group"
        >
          <Button
            onClick={() => {asyncThrow(new Error('Simulated error'));}}>Simulate Error</Button>
        </ButtonGroup>
      </Grid>
    </>
  );
}
