import { FC } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Movie } from '@/api/models';
import { MoviesGridContainerId } from '@/constants/testIdentifiers';
import { GridContainer, Poster } from './MoviesDataGrid.style';
import { Skeleton, Typography } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'poster', headerName: 'Poster', width: 140, sortable: false,
    renderCell: ({value}) => value
      ? <Poster src={value} />
      : <Typography variant="body1">
        <Skeleton animation={false} variant="text">(not available)</Skeleton>
      </Typography>
  },
  { field: 'title', headerName: 'Title', flex: 3 },
  { field: 'year', headerName: 'Year', flex: 1 },
];

export interface MoviesDataGridProps {
    movies: Movie[];
}

const MoviesDataGrid: FC<MoviesDataGridProps> = ({movies}) => {

  const rows = movies.map(movie => { return { id: movie.imdbID, ...movie }; });

  return (
    <GridContainer data-testid={MoviesGridContainerId}>
      <div style={{ flexGrow: 1 }} >
        <DataGrid rowHeight={180} rows={rows} columns={columns} autoHeight={true} />
      </div>
    </GridContainer>
  );
};

export default MoviesDataGrid;
