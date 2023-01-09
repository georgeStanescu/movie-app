import { FC } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Movie } from '@/api/models';
import { MoviesGridContainerId } from '@/constants/testIdentifiers';
import { GridContainer } from './MoviesDataGrid.style';

const columns: GridColDef[] = [
  { field: 'Poster', headerName: 'Poster', width: 100, sortable: false,
    renderCell: (params) => <img src={params.value} />
  },
  { field: 'Title', headerName: 'Title', width: 300 },
  { field: 'Year', headerName: 'Year', width: 100 },
];

export interface MoviesDataGridProps {
    movies: Movie[];
}

const MoviesDataGrid: FC<MoviesDataGridProps> = ({movies}) => {

  const rows = movies.map(movie => { return { id: movie.imdbID, ...movie }; });

  return (
    <GridContainer data-testid={MoviesGridContainerId}>
      <div style={{ flexGrow: 1 }} >
        <DataGrid rows={rows} columns={columns} autoHeight={true} />
      </div>
    </GridContainer>
  );
};

export default MoviesDataGrid;
