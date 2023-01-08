import { Movie, SearchResponse } from '@/api/models';
import { MoviesDataGrid } from '@/Components';
import { AppContextProvider, appReducer, initialState } from '@/state';
import { Head } from '@inertiajs/inertia-react';
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
    }
  };

  return (
    <>
      <AppContextProvider state={state} dispatch={dispatch}>
        <Head title="Movies" />
        <Grid container justifyContent={'center'} direction="column" >
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
          >
            <Button onClick={() => fetchMovies('Matrix')}>Query Matrix</Button>
            <Button onClick={() => fetchMovies('Matrix Reloaded')}>Query Matrix Reloaded</Button>
            <Button onClick={() => fetchMovies('Matrix Revolutions')}>Query Matrix Revolutions</Button>
          </ButtonGroup>

          <MoviesDataGrid movies={movies} />
        </Grid>
      </AppContextProvider>
    </>
  );
}
