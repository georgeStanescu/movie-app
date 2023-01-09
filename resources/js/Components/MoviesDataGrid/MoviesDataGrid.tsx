import { FC } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Movie } from '@/api/models';
import { MoviesGridContainerId } from '@/constants/testIdentifiers';
import { GridContainer, Poster } from './MoviesDataGrid.style';

const columns: GridColDef[] = [
  { field: 'Poster', headerName: 'Poster', width: 140, sortable: false,
    renderCell: (params) => <Poster src={params.value} />
  },
  { field: 'Title', headerName: 'Title', flex: 3 },
  { field: 'Year', headerName: 'Year', flex: 1 },
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
